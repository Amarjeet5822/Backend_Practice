const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
  name: {type:String, require: true},
  email: { 
    type:String, 
    require: true,
    unique: true, 
    validate:{
      validator: (value)=> {
        return /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(value)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  pass: {type:String, require: true},
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },

},{
  versionKey:false
});

const UserModel = model("users", userSchema);

module.exports = {UserModel};