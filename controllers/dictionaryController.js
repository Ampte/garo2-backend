const db = require("../db");

exports.getWords = (req, res) => {
  db.query("SELECT * FROM dictionary", (err, result) =>
    res.json(result)
  );
};

exports.addWord = (req, res) => {
  const { english, garo } = req.body;

  db.query(
    "INSERT INTO dictionary (english, garo) VALUES (?,?)",
    [english, garo],
    () => res.json({ message: "Word added" })
  );
};

exports.deleteWord = (req, res) => {
  db.query(
    "DELETE FROM dictionary WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
};