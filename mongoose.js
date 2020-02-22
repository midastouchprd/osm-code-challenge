// DB Connection
const mongoose = require("mongoose");
let uri;

//Run in production mode to use the live mongo instance.

//otherwise you need a database named test
if (process.env.NODE_ENV !== "production") {
  uri = "mongodb://localhost";
} else {
  uri = process.env.MONGO_DB_URI;
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

module.exports = db;
