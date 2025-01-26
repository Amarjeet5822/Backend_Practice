const fs = require('fs');
const express = require("express");
const port = 8080;
const app = express();
// Read file from db.json
// app.get("/api/users", (req, res) => {
//   fs.readFile('db.json', 'utf8', (err, data) => {
//     if(err) {
//       res.status(500).json({ message: "Error reading file"})
//       return ;
//     }
//     const users = JSON.parse(data)
//     res.send(users.students)

//   });
// });

// app.listen(port, () => {
//   console.log(`App is running at http://localhost:${port}`)
// });

// Creating Data ( POST Request)
app.use(express.json()); // it is a middleware. When user post a request then we don't need to parse those json data.
app.post("/api/users", (req, res ) => {
  fs.readFile("db.json","utf8", (err, data) => {
    if(err){
      res.status(500).json({message:"Error reading file"});
      return;
    }
    const db = JSON.parse(data)
    const newStudents = db.students || [];
    newStudents.push(req.body)

    db.students = newStudents;
    fs.writeFile("db.json", JSON.stringify(db, null, 2), (writeErr) => {
      if(err) {
        res.status(500).json({ message:"Error writing file"});
        return 
      }
      res.send(JSON.stringify(newStudents))

    })
    
  })
})

app.delete("/api/users/:id", (req, res) => {
  fs.readFile("db1.json", "utf8", (err, data) => {
    if(err){
      res.status(500).json({message:"Error Reading file."})
    }
    const db = JSON.parse(data)
    const newDb = db.users;
    const userId = parseInt(req.params.id)
    const userIdIndex = newDb.findIndex((item) => item.id === userId)
    if(userIdIndex) {
      res.status(404).json({message: "User id not found"})
    }
    res.send()
    const filteredData = newDb.filter((item) => item.id !=req.params.id)
    db.users = filteredData;
    fs.writeFile("db1.json", JSON.stringify(db, null, 2), (errWrite) => {
      if(errWrite) {
        res.status(500).json({message:"Error writing file"});
      }
      res.send(JSON.stringify(filteredData));
    })
  })
} )
app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`)
});
