const multer = require("multer");
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const cloudinary = require('./cloudinaryConfig')

// configure Multer for temporary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params:{
    folder: "uploads", // Cloudinary folder name
    resource_type: "auto",
  },
});

const upload = multer({storage});

module.exports = upload;