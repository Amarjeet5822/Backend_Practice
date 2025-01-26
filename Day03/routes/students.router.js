const express = require("express");
const studentsRouter = express.Router();

studentsRouter.get("/", (req, res) => {
  console.log("line 8")
  res.send("MongoDB is connected now need to do query.")
})

studentsRouter.post("/add", (req, res) => {
  res.send("Need to implements")
})

module.exports = {studentsRouter};