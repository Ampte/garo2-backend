require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

/* ROUTES */
const user = require("./routes/users");
const dictionary = require("./routes/dictionary");
const chatbot = require("./routes/chatbot");
const translate = require("./routes/translate");

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ⭐ API PREFIX (REQUIRED) */
app.use("/api", user);
app.use("/api", dictionary);
app.use("/api", chatbot);
app.use("/api", translate);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(port, () => {
  console.log("Server is running");
});