require("dotenv").config();
const db = require("./db");

const express = require("express");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3000;

const user = require("./routes/users");
const dictionary = require("./routes/dictionary");
const chatbot = require("./routes/chatbot");


app.use(cors());
app.use(express.json());

app.use(user);
app.use(dictionary);
app.use(chatbot);



app.get("/", (req, res) => {
  res.send("Server is running")
});


app.listen(port, () => {
  console.log("Server is running");
});
