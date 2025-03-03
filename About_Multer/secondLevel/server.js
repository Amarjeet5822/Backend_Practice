const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

// Storage engine 
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb ) => {
    cb(null, file.fieldname + "-" + Date.now()+ path.extname(file.originalname));
  }
})

// File type validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/; // Only images allowed!
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = allowedTypes.test(file.mimetype);

  if(extname && mimeType) {
    cb(null, true) // Valid file
  } else {
    cb(new Error("Invalid file type. Only images are allowed!"));
  }
}

// Multer config with file size limit and validation
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB max
  fileFilter: fileFilter
});

// Serve HTML form
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
})

// Handle file upload
app.post("/upload", (req, res) => {
  upload.single("avatar")(req, res, (err) => {
    if(err) {
      res.status(400).send(err.message);// Error message
    } else {
      console.log(req.file);
      res.send("File uploaded Successfully!");
    }
  });
})

const PORT = 8082;
app.listen(PORT, () => {
  console.log("app running http://localhost:8082");
})