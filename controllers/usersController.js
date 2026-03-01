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
export const addUser = async (data) => {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || result.error || "Server error"
    );
  }

  return result;
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