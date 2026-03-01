const db = require("../db");

/* ---------- GET USERS ---------- */
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("GET USERS ERROR:", err);
    res.status(500).json({ error: "Database error" });
  }
};

/* ---------- ADD USER ---------- */
const addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    const [result] = await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.json({
      id: result.insertId,
      name,
      email,
    });
  } catch (err) {
    console.error("ADD USER ERROR:", err);
    res.status(500).json({ error: "Insert failed" });
  }
};

/* ---------- DELETE USER ---------- */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM users WHERE id=?", [id]);

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error("DELETE USER ERROR:", err);
    res.status(500).json({ error: "Delete failed" });
  }
};

/* ---------- EXPORT ---------- */
module.exports = {
  getUsers,
  addUser,
  deleteUser,
};