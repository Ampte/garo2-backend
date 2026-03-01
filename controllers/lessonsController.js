const db = require("../db");

exports.getLessons = (req, res) => {
  db.query("SELECT * FROM lessons", (err, result) =>
    res.json(result)
  );
};

exports.addLesson = (req, res) => {
  const { title, level } = req.body;

  db.query(
    "INSERT INTO lessons (title, level) VALUES (?,?)",
    [title, level],
    () => res.json({ message: "Lesson added" })
  );
};

exports.deleteLesson = (req, res) => {
  db.query(
    "DELETE FROM lessons WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
};