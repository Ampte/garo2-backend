const db = require("../db");

exports.getStats = (req, res) => {

  const sql = `
    SELECT
      (SELECT COUNT(*) FROM users) AS users,
      (SELECT COUNT(*) FROM dictionary) AS words,
      (SELECT COUNT(*) FROM chatbot) AS chatbot
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.error("Stats error:", err);
      return res.status(500).json({ error: "Stats failed" });
    }

    res.json(result[0]);
  });
};