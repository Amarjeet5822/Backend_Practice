const express = require("express" )
const fs = require("fs")
const app = express();

app.get("/data", (req, res) => {
  fs.readFile("db.json", "utf-8", (err, data) => {
    if(err) {
      res.send({ "msg" : "Error reading file", err})
    }
    let parsedData = JSON.parse(data)
    res.send(parsedData.users);
    
  })
})

app.listen(6060,() => {
  console.log("Server is running at http://localhost:6060")
})