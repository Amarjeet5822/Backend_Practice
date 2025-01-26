const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
  username:{
    type: String,
    require: true
  },
  age:{
    type: Number,
    require: true,
    validate: {
      validator: (value) => {
        return value>=18 && value<=65
      },
      message:"Age INVALID! age should be in range 18 and 65"
    }
  },
  location:{
    type: String,
    require: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users"
  }
},{
  versionKey: false
}
)

const ProfileModel = mongoose.model("profiles", profileSchema);

module.exports = { ProfileModel}