const express = require("express");
const fs = require("fs");
const filePath = "./db.json"
const teachersRouter = express.Router();

teachersRouter.get("/", (req, res) => {
  let usersData;
  console.log("line 8")
  fs.readFile(filePath, "utf-8", (err, data) => {
    console.log("enter error position");
    if(err) {  
      res.status(404).json({"message": "Error Reading File"})
      return;
    }
    usersData = JSON.parse(data)
    res.send({"message":"data of teachers", teachers: usersData.teachers})
  })
})

teachersRouter.post("/add", (req, res) => {
  res.send("Need to implements")
})

module.exports = {teachersRouter};