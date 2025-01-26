const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true,
    unique: true
  },
  pass:{
    type: String,
    require: true,
    validate: {
      validator:(value)=> {
        return value>=8
      },
      message:"Password must be at least 8 characters"
    }
  },
  role:{
    type: String,
    default: "reader",
    enum: ["admin", "reader","author"]
  }
},{
  versionKey:false
})

const UserModel = mongoose.model("users", userSchema);

module.exports = {UserModel};