require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;


(async () => {
  try {
    await db.query("SELECT 1");
    console.log("✅ MySQL Connected Successfully");
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err);
  }
})();

/* middleware */
app.use(express.json());

/* CORS (IMPORTANT) */
app.use(cors({
  origin: [
    "https://garo2.com",
    "https://www.garo2.com"
  ]
}));

/* API routes */
app.use("/api/users", require("./routes/users"));
app.use("/api/dictionary", require("./routes/dictionary"));
app.use("/api/lessons", require("./routes/lessons"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/translate", require("./routes/translate"));
app.use("/api/chatbot", require("./routes/chatbot"));

app.get("/", (req, res) => {
  res.send("Garo2 Backend API Running");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});