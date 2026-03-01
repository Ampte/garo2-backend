const db = require("../db");

/* GET CHATS */
exports.getChats = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM chatbot ORDER BY id DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* ADD CHAT */
exports.addChat = async (req, res) => {
  try {
    const { message } = req.body;

    const [result] = await db.query(
      "INSERT INTO chatbot (message) VALUES (?)",
      [message]
    );

    res.json({ id: result.insertId, message });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/* DELETE CHAT */
exports.deleteChat = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM chatbot WHERE id=?",
      [req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};