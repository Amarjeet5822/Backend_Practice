const express = require('express');
const multer = require('multer');
const morgan = require("morgan");
require("dotenv").config();
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(morgan("tiny"));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret,
});

// Multer storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif'], // Allowed file types
    public_id: (req, file) => file.fieldname + '-' + Date.now() // Unique file names
  }
});

const upload = multer({ storage: storage });

// Serve HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Handle file upload
app.post('/upload', upload.single('avatar'), (req, res) => {
  if (req.file) {
    console.log('File uploaded to Cloudinary:', req.file.path);
    res.send('File uploaded to Cloudinary successfully!');
  } else {
    res.status(400).send('File upload failed!');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
