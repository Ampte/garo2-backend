const db = require("../db");

exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    res.json(result);
  });
};

exports.addUser = (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name,email) VALUES (?,?)",
    [name, email],
    () => res.json({ message: "User added" })
  );
};

exports.deleteUser = (req, res) => {
  db.query(
    "DELETE FROM users WHERE id=?",
    [req.params.id],
    () => res.json({ message: "Deleted" })
  );
};