var express = require("express");
var router = express.Router();

router.get("/help", function(req, res) {
  res.send("This is the widgets resource");
});

module.exports = router;
