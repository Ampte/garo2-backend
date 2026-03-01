const db = require("../db");

/* ===============================
   GET WORDS
=============================== */
exports.getWords = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM dictionary ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error("Get Words Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   ADD WORD
=============================== */
exports.addWord = async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { word, meaning } = req.body;

    if (!word?.trim() || !meaning?.trim()) {
      return res.status(400).json({
        error: "Word and meaning required",
      });
    }

    const [result] = await db.query(
      "INSERT INTO dictionary (word, meaning) VALUES (?, ?)",
      [word, meaning]
    );

    res.json({
      success: true,
      id: result.insertId,
      word,
      meaning,
    });
  } catch (err) {
    console.error("Add Word Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ===============================
   DELETE WORD
=============================== */
exports.deleteWord = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM dictionary WHERE id=?",
      [req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Delete Word Error:", err);
    res.status(500).json({ error: err.message });
  }
};