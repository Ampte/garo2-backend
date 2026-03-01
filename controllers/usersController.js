const db = require("../db");

/* ---------- GET USERS ---------- */
exports.getUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------- ADD USER ---------- */
exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // validation
    if (!name || !email) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await db.query(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [name, email]
    );

    res.json({ message: "User added successfully" });

  } catch (err) {
    console.error("ADD USER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

/* ---------- DELETE USER ---------- */
exports.deleteUser = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM users WHERE id=?",
      [req.params.id]
    );

    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};