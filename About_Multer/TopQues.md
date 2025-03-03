# 📚 Top Most Asked Questions on Multer

### 1️⃣ What is Multer and why is it used?
Multer is a Node.js middleware used for handling `multipart/form-data`, which is primarily used for uploading files in Express.js applications. It makes it easy to manage file uploads by storing files locally or on cloud storage platforms.

---

### 2️⃣ How do you install Multer?
Use the following npm command:
```bash
npm install multer
```

---

### 3️⃣ How do you set up basic file uploads with Multer?
Basic setup for single file upload:
```javascript
const express = require('express');
const multer = require('multer');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('avatar'), (req, res) => {
  res.send('File uploaded successfully!');
});
```

---

### 4️⃣ What does `dest` do in Multer?
The `dest` option in Multer specifies the destination folder where uploaded files will be stored. Example:
```javascript
const upload = multer({ dest: 'uploads/' });
```
This will store all uploaded files in the `uploads/` folder.

---

### 5️⃣ How do you upload multiple files using Multer?
Use `upload.array()` to upload multiple files:
```javascript
app.post('/upload', upload.array('photos', 5), (req, res) => {
  res.send('Multiple files uploaded successfully!');
});
```
Here, `'photos'` is the name of the file field, and `5` is the maximum number of files allowed.

---

### 6️⃣ How do you configure custom file storage in Multer?
Use `diskStorage` to customize file storage locations and file names:
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

---

### 7️⃣ How do you handle text fields along with file uploads?
Use `.none()` for text-only forms or `req.body` to access text fields along with file uploads:
```javascript
app.post('/profile', upload.none(), (req, res) => {
  console.log(req.body);
});
```

---

### 8️⃣ How do you integrate Multer with Cloudinary?
Install `multer-storage-cloudinary` and configure Cloudinary:
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

---

### 9️⃣ What is the difference between `upload.single()`, `upload.array()`, and `upload.fields()`?
- `upload.single('fieldname')`: Uploads a single file.
- `upload.array('fieldname', maxCount)`: Uploads multiple files with the same field name.
- `upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])`: Handles multiple file fields.

---

### 🔟 How do you handle file validation (like checking file type or size)?
You can use the `fileFilter` option:
```javascript
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});
```

---

Would you like to dive deeper into any of these concepts? Let me know! 🚀

