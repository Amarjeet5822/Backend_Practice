const express = require("express");
const upload = require("./multerConfig")
const path = require("path")
const app = express();

// serve index.html file at home page
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "index.html"))
});

// post your image via frontend 
app.post("/upload", upload.single("file"), (req, res) => {
  if(req.file && req.file.path){
    res.status(200).json({
      message:"File uploaded Successfully",
      imageUrl: req.file.path,
    })
  }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`app is running http://localhost:${port}`);
})