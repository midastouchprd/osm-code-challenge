// Packages
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const db = require("./mongoose");

//Variables
const app = express();
const port = 9050;

// DB Connection
db.on("error", console.error.bind(console, "connection error:"));
db.on("disconnected", () => {
  console.log("db disconnected");
});
db.on("open", () => {
  console.log("db connected");
  if (!module.parent) {
    app.listen(port, () => console.log(`Server Running on ${port}!`));
  }
});

//Middleware
app.use(bodyParser.json());

// Routes
app.use("/instructions", require("./routes/instructions"));
app.use("/widgets", require("./routes/widgets"));

//Export app for testing
module.exports = app;
