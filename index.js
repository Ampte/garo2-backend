require("dotenv").config();

const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

/* ===============================
   CORS MUST COME FIRST
================================ */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://garo2.com",
    "https://www.garo2.com"
  ],
  credentials: true,
}));

/* IMPORTANT: handle preflight */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

/* ===============================
   BODY PARSER AFTER CORS
================================ */
app.use(express.json());

/* ===============================
   ROUTES
================================ */
app.use("/api/users", require("./routes/users"));
app.use("/api/dictionary", require("./routes/dictionary"));
app.use("/api/lessons", require("./routes/lessons"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/translate", require("./routes/translate"));
app.use("/api/chatbot", require("./routes/chatbot"));

/* ===============================
   TEST ROUTE
================================ */
app.get("/", (req, res) => {
  res.send("API Running");
});

/* ===============================
   START SERVER
================================ */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});