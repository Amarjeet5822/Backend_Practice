const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv")

// load environment variables
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_cloud_name,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret,
});

module.exports = cloudinary;