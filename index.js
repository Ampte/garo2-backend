require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());


app.use("/api/users", require("./routes/users"));
app.use("/api/dictionary", require("./routes/dictionary"));
app.use("/api/lessons", require("./routes/lessons"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/translate", require("./routes/translate"));
app.use("/api/chatbot", require("./routes/chatbot"));



app.get("/", (req, res) => {
  res.send('<h1>Welcome to the Server site of Garo2</h1>');
});

app.listen(port, () => {
  console.log("Server running on", port);
});