var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.json({ data: "This is the instructions resource" });
});
module.exports = router;
