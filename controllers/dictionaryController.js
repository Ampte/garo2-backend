const db = require("../db");

/* ---------- GET WORDS ---------- */
exports.getWords = (req, res) => {
  db.query("SELECT * FROM dictionary", (err, result) => {
    if (err) {
      console.error("GET WORDS ERROR:", err);
      return res.status(500).json({ error: "Database error" });
    }

    res.json(result);
  });
};

/* ---------- ADD WORD ---------- */
exports.addWord = (req, res) => {
  const { english, garo } = req.body;

  // validation
  if (!english || !garo) {
    return res.status(400).json({
      error: "English and Garo are required",
    });
  }

  db.query(
    "INSERT INTO dictionary (english, garo) VALUES (?, ?)",
    [english, garo],
    (err, result) => {
      if (err) {
        console.error("ADD WORD ERROR:", err);
        return res.status(500).json({ error: "Insert failed" });
      }

      res.json({
        message: "Word added",
        id: result.insertId,
      });
    }
  );
};

/* ---------- DELETE WORD ---------- */
exports.deleteWord = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM dictionary WHERE id=?",
    [id],
    (err) => {
      if (err) {
        console.error("DELETE ERROR:", err);
        return res.status(500).json({ error: "Delete failed" });
      }

      res.json({ message: "Deleted" });
    }
  );
};