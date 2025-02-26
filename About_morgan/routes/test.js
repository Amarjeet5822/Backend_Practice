const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Your are at text route.")
});

module.exports = router;