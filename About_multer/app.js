const express = require("express");
const multer = require("multer");
const path = require('path');

const app = express();

app.use(express.json());

// Storage engine for multer (destination and file naming logic)
const storage = multer.diskStorage({
  destination: "./uploads/", // where file save
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});

// Initialize upload variable
const upload = multer({storage: storage });

//Route to server HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Handle file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  console.log("line 22 base url :=>", req.file); // uploaded file details
  res.send("File uploaded successfully!");
})

// Multiple fien uploads:
app.post("/uploads", upload.array("photos", 5), (req, res) => {
  console.log("Array of uploaded files => ",req.files); 
  res.send("Files uploaded successfully!");
})

// Text fields (req.body):
app.post("/data", upload.single("file"), (req, res) => {
  console.log("Text fields => ",req.body)
})


const PORT = 8081
app.listen(PORT, () => {
  console.log(`app running http://localhost:${PORT}`);
})
