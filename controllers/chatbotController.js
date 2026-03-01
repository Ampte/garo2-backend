const db = require("../db");

/* =====================================================
   GET CHATS
   GET /api/chatbot
===================================================== */
exports.getChats = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM chatbot ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error("Get Chats Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =====================================================
   ADD CHAT
   POST /api/chatbot
===================================================== */
exports.addChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({
        error: "Message required",
      });
    }

    // insert into QUESTION column
    const [result] = await db.query(
      "INSERT INTO chatbot (question, answer) VALUES (?, ?)",
      [message, ""]
    );

    res.json({
      id: result.insertId,
      question: message,
      answer: "",
    });
  } catch (err) {
    console.error("Add Chat Error:", err);
    res.status(500).json({ error: err.message });
  }
};

/* =====================================================
   DELETE CHAT
===================================================== */
exports.deleteChat = async (req, res) => {
  try {
    await db.query(
      "DELETE FROM chatbot WHERE id = ?",
      [req.params.id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error("Delete Chat Error:", err);
    res.status(500).json({ error: err.message });
  }
};