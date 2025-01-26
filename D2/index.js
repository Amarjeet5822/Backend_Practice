// const fs = require('fs')
// // Create a file 
// // if file is already present, then it will override the content
// // If not present, then it will create the file
// // cannot create folder in a specified path using the cwd as base dir
// fs.writeFileSync("message.txt",'test data second time it will override the content.')

// // append file with create new file if given file is not exist
// fs.appendFileSync("appendTest.txt", "Appended data in appendTest file \n")
// fs.appendFileSync("appendTest.txt", "Appended data in appendTest file 2\n")


// fs.writeFile("example.txt", "This will create txt file asynchronously.", (err) => {
//   if(err) {
//     console.log("error in writing file", err)
//     return;
//   }
//   console.log("file created successfully.");

// } )

// const data = Buffer.from("Hello, this is a Buffer!");
// fs.writeFileSync('example.txt', data); // Writes the binary data to a file

// // Write data as a string
// fs.writeFileSync('string.txt', "This is a string.");

// // Write data as a Buffer
// const bufferData = Buffer.from("This is a Buffer.");
// fs.writeFileSync('buffer.txt', bufferData);

// // Write data as a Uint8Array
// const uint8Data = new Uint8Array([84, 104, 105, 115, 32, 105, 115, 32, 97, 32, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 46]);
// fs.writeFileSync('uint8.txt', uint8Data);

const express = require("express");
const fs = require("fs");
const filePath = "message.txt"
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