
const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title:{
    type: String,
    require: true,
    unique: true
  },
  content:{
    type: String,
    require: true,
  },
  author:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    require: true
  }
},{
  versionKey:false
})

const BlogModel = mongoose.model("blogs", blogSchema);

module.exports = {BlogModel};