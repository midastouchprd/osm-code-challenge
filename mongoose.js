// DB Connection
const mongoose = require("mongoose");
let uri;
if (process.env.NODE_ENV !== "production") {
  uri = "mongodb://localhost";
} else {
  uri = process.env.MONGO_DB_URI;
}

console.log(uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;

module.exports = db;
