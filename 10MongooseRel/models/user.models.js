const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name:{
    type: String,
    require: true
  },
  email:{
    type: String,
    require: true,
    unique: true
  },
  password: {
    type:String,
    require: true,
    validate:{
      validator:(value)=>{
        return value.length>=8
      },
      message:"Password must be >= 8 "
    }
  }
},
{
  versionKey: false
}
)

const UserModel = mongoose.model("users", userSchema);

module.exports = { UserModel}  