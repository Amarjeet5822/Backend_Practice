# Multer Tutorial Summary

## 📁 What is Multer?
Multer is a Node.js middleware for handling `multipart/form-data`, primarily used for uploading files in Express.js applications.

## 🚀 Key Concepts:

1. **Installation:**
```bash
npm install multer
```

2. **Basic Usage:**
   - **Single File Upload:**
```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.send('File uploaded successfully!');
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

   - **Multiple File Upload:**
```javascript
app.post('/photos/upload', upload.array('photos', 12), (req, res) => {
  res.send('Multiple files uploaded successfully!');
});
```

3. **Storage Configuration:**
   - Storing files in a specific folder with custom filenames:
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

const upload = multer({ storage: storage });
```

4. **Handling Text Fields:**
   - Use `.none()` method for text-only forms:
```javascript
app.post('/profile', upload.none(), (req, res) => {
  res.send(req.body);
});
```

5. **Cloudinary Integration:**
   - Storing files in Cloudinary instead of local server:
```javascript
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: { folder: 'uploads' }
});

const upload = multer({ storage: storage });
```

## 📁 Folder Structure:
```
/multer-cloudinary
│-- /views
│     └── index.html
│-- .env
│-- server.js
│-- package.json
```

## 🔥 Next Steps:
- Multiple file uploads with Cloudinary
- Showing uploaded images on the frontend

---

