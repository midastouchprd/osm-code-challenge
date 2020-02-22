const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/:color", async function(req, res) {
  let color = req.params.color;
  return res.status(200).sendFile(path.resolve(`logs/${color}.log`));
});

module.exports = router;
