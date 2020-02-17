// Packages
require("dotenv").config();
const express = require("express");
const app = express();
const port = 9050;

// DB Connection
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection
  .on("error", console.error.bind(console, "connection error:"))
  .on("disconnected", () => {
    console.log("db disconnected");
  })
  .on("open", () => {
    console.log("db connected");
    app.listen(port, () => console.log(`Server Running on ${port}!`));
  });

// Routes
app.use("/instructions", require("./routes/instructions"));
app.use("/widgets", require("./routes/widgets"));
