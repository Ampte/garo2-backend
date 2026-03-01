require("dotenv").config();

/* ---- crash protection (VERY IMPORTANT for Hostinger) ---- */
process.on("uncaughtException", err => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", err => {
  console.error("UNHANDLED REJECTION:", err);
});

const express = require("express");
const cors = require("cors");

/* ✅ IMPORT DATABASE (MISSING IN YOUR CODE) */
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

/* ---------- TEST DATABASE CONNECTION ---------- */
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL Connected Successfully");
  } catch (err) {
    console.error(" MySQL Connection Failed:", err.message);
    // server continues running (avoids 503)
  }
})();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());

app.use(cors({
  origin: [
    "https://garo2.com",
    "https://www.garo2.com"
  ],
  credentials: true
}));

/* ---------- ROUTES ---------- */
app.use("/api/users", require("./routes/users"));
app.use("/api/dictionary", require("./routes/dictionary"));
app.use("/api/lessons", require("./routes/lessons"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/translate", require("./routes/translate"));
app.use("/api/chatbot", require("./routes/chatbot"));

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Garo2 Backend API Running");
});

/* ---------- START SERVER ---------- */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});