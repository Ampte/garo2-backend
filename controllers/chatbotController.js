const db = require("../db");

/* ---------- GET ALL ---------- */
exports.getChats = (req, res) => {
  db.query("SELECT * FROM chatbot ORDER BY id DESC",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

/* ---------- ADD ---------- */
exports.addChat = (req, res) => {
  const { question, answer } = req.body;

  db.query(
    "INSERT INTO chatbot (question, answer) VALUES (?,?)",
    [question, answer],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Chat added" });
    }
  );
};

/* ---------- DELETE ---------- */
exports.deleteChat = (req, res) => {
  db.query(
    "DELETE FROM chatbot WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Deleted" });
    }
  );
};

/* ---------- CHATBOT RESPONSE ---------- */
exports.getBotReply = (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.json({ reply: "Please type something." });
  }

  const sql = `
    SELECT answer
    FROM chatbot
    WHERE LOWER(?) LIKE CONCAT('%', LOWER(question), '%')
    LIMIT 1
  `;

  db.query(sql, [message], (err, result) => {
    if (err) {
      console.error(err);
      return res.json({ reply: "Server error." });
    }

    if (!result.length) {
      return res.json({
        reply: "Sorry, I don't understand yet."
      });
    }

    res.json({
      reply: result[0].answer
    });
  });
};