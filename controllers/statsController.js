const db = require("../db");

/* ===============================
   GET DASHBOARD STATS
================================ */
exports.getStats = async (req, res) => {
  try {
    const sql = `
      SELECT
        (SELECT COUNT(*) FROM users) AS users,
        (SELECT COUNT(*) FROM dictionary) AS words,
        (SELECT COUNT(*) FROM chatbot) AS chatbot
    `;

    // mysql2/promise returns [rows, fields]
    const [rows] = await db.query(sql);

    res.json(rows[0]);

  } catch (err) {
    console.error("Stats error:", err);
    res.status(500).json({
      error: "Stats failed",
    });
  }
};