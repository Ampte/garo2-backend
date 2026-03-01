const db = require("../db");

/* ---------- GET USERS ---------- */
const getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(result);
  });
};

/* ---------- ADD USER ---------- */
const addUser = (req, res) => {
  const { name, email } = req.body;

  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Insert failed" });
      }

      res.json({
        id: result.insertId,
        name,
        email,
      });
    }
  );
};

/* ---------- DELETE USER ---------- */
const deleteUser = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Delete failed" });
    }

    res.json({ message: "User deleted" });
  });
};

/* ---------- EXPORT ---------- */
module.exports = {
  getUsers,
  addUser,
  deleteUser,
};