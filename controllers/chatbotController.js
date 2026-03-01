/* =====================================================
   CHATBOT CONTROLLER
   Works with mysql2/promise
===================================================== */

const db = require("../db");

/* =====================================================
   GET ALL CHATS
   GET /api/chatbot
===================================================== */
exports.getChats = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM chatbot ORDER BY id DESC"
    );

    res.json(rows);
  } catch (err) {
    console.error(" Get Chats Error:", err);
    res.status(500).json({
      error: "Failed to fetch chats",
      details: err.message,
    });
  }
};

/* =====================================================
   ADD CHAT MESSAGE
   POST /api/chatbot
===================================================== */
exports.addChat = async (req, res) => {
  try {
    const { message } = req.body;

    // validation
    if (!message || message.trim() === "") {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const [result] = await db.query(
      "INSERT INTO chatbot (message) VALUES (?)",
      [message]
    );

    res.json({
      success: true,
      id: result.insertId,
      message,
    });
  } catch (err) {
    console.error(" Add Chat Error:", err);
    res.status(500).json({
      error: "Failed to add chat",
      details: err.message,
    });
  }
};

/* =====================================================
   DELETE CHAT
   DELETE /api/chatbot/:id
===================================================== */
exports.deleteChat = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM chatbot WHERE id = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Chat deleted",
    });
  } catch (err) {
    console.error(" Delete Chat Error:", err);
    res.status(500).json({
      error: "Failed to delete chat",
      details: err.message,
    });
  }
};