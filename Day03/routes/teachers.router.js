const express = require("express");

const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  res.send({"message":"data of teachers"})
})

teachersRouter.post("/add", (req, res) => {
  res.send("Need to implements")
})

module.exports = {teachersRouter};