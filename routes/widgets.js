var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
  res.json({ data: "This is the widgets resource" });
});

//create a widget
router.post("/", function(req, res) {
  console.log(req.body);

  res.json({ data: "This is the widgets resource" });
});

module.exports = router;
