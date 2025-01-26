const express = require("express");
const fs = require("fs");
const filePath = "./texturl.txt"
const app = express();

app.use((req, res, next) => {
  fs.appendFileSync(filePath, "Hello Jii \n")
  console.log("data appended")
  next();
})

app.get("/", (req, res) => {
  res.send("Home Page")
})
app.get("/about", (req, res) => {
  res.send("About Page")
})
app.get("/contacts", (req, res) => {
  res.send("Contacts Page")
})

app.listen(8080, () => {
  console.log("app is running at localhost 8080")
})