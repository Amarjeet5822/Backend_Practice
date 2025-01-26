const { UserModel } = require("../models/users.models")

const authMiddleware = (array) => {
  return async (request, response, next ) => {
    try {
      const userIs = await UserModel.findOne({email: request.body.email});
      console.log(userIs, "line 7")
      if(array.includes(userIs.role)){
        next()
      }else{
        response.json({message:"Your are Unauthorized"})
      }

    } catch (error) {
      response.json({message:"Your are Unauthorized", error})
    }
  

  }
}

module.exports = {authMiddleware}