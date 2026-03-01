const db = require("../db");

/*
POST /api/translate

BODY:
{
  text: "hello friend",
  from: "english",
  to: "garo"
}
*/

exports.translateWord = (req, res) => {
  const { text, from, to } = req.body;

  /* ---------- VALIDATION ---------- */

  if (!text || !from || !to) {
    return res.status(400).json({ text: "Missing data" });
  }

  // same language → return original text
  if (from === to) {
    return res.json({ text });
  }

  /* ---------- SELECT QUERY ---------- */

  let sql;

  // English → Garo
  if (from === "english" && to === "garo") {
    sql = `
      SELECT garo AS translation
      FROM dictionary
      WHERE LOWER(english)=LOWER(?)
      LIMIT 1
    `;
  }

  // Garo → English
  else if (from === "garo" && to === "english") {
    sql = `
      SELECT english AS translation
      FROM dictionary
      WHERE LOWER(garo)=LOWER(?)
      LIMIT 1
    `;
  }

  else {
    return res.json({ text });
  }

  /* ---------- SENTENCE TRANSLATION ---------- */

  const words = text.trim().split(/\s+/);

  let translatedWords = [];
  let completed = 0;

  words.forEach((word, index) => {
    db.query(sql, [word], (err, result) => {

      if (err) {
        console.error("DB ERROR:", err);
        translatedWords[index] = word;
      }
      else if (!result.length) {
        // keep original if not found
        translatedWords[index] = word;
      }
      else {
        translatedWords[index] = result[0].translation;
      }

      completed++;

      // send response when all words processed
      if (completed === words.length) {
        res.json({
          text: translatedWords.join(" ")
        });
      }
    });
  });
};