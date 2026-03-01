require("dotenv").config();

/* =====================================================
   CRASH PROTECTION (IMPORTANT FOR HOSTINGER)
===================================================== */
process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

/* =====================================================
   IMPORTS
===================================================== */
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

/* =====================================================
   DATABASE CONNECTION TEST
===================================================== */
(async () => {
  try {
    await db.query("SELECT 1");
    console.log("MySQL Connected Successfully");
  } catch (err) {
    console.error("MySQL Connection Failed:", err.message);
  }
})();

/* =====================================================
   DB KEEP ALIVE (Prevents Hostinger sleep)
===================================================== */
setInterval(async () => {
  try {
    await db.query("SELECT 1");
    console.log("DB keepalive ping");
  } catch (err) {
    console.error("DB reconnect attempt:", err.message);
  }
}, 300000);

/* =====================================================
   CORS CONFIG (FINAL FIX)
===================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "https://garo2.com",
  "https://www.garo2.com",
  "https://admin.garo2.com",
];

app.use(cors({
  origin: function (origin, callback) {
    // allow Postman/server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

/* ---------- HANDLE PREFLIGHT REQUESTS ---------- */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
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

/* =====================================================
   MIDDLEWARE
===================================================== */
app.use(express.json());

/* =====================================================
   ROUTES
===================================================== */
app.use("/api/users", require("./routes/users"));
app.use("/api/dictionary", require("./routes/dictionary"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/translate", require("./routes/translate"));
app.use("/api/chatbot", require("./routes/chatbot"));

/* =====================================================
   HEALTH CHECK
===================================================== */
app.get("/", (req, res) => {
  res.send(" Garo2 Backend API Running");
});

app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT NOW() AS server_time");
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/* =====================================================
   GLOBAL ERROR HANDLER
===================================================== */
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

/* =====================================================
   START SERVER
===================================================== */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});