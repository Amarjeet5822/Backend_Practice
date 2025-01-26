const express = require("express")
const fs = require('fs');
const filePath = "./test.txt"
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  fs.appendFileSync(filePath, "Let's try \n")
  res.send("About User ")
})
userRouter.get("/profile", (req, res) => {
  res.send("Profile User ")
})

module.exports = {userRouter};