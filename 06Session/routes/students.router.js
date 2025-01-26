const express = require("express");
const fs = require("fs");
const filePath = "./db.json"
const studentsRouter = express.Router();

studentsRouter.get("/", (req, res) => {
  console.log("line 8")
  fs.readFile(filePath, "utf-8", (err, data) => {
    console.log("enter error position");
    if(err) {  
      res.status(404).json({"message": "Error Reading File"})
    }
    const usersData = JSON.parse(data)
    res.send({"message":"data of students", students: usersData.students})
  })
})

studentsRouter.post("/add", (req, res) => {
  res.send("Need to implements")
})

module.exports = {studentsRouter};