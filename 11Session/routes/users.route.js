const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/users.models");
const { auth } = require("../middlewares/auth");
const { authMiddleware } = require("../middlewares/authMiddleware");
const userRouter = express.Router()

// For user Registration
userRouter.post("/register", async (request, response) => {
  const {pass, name, email, role} = request.body;
  try {
    bcrypt.hash(pass, 6, async (err, hash) => {
      if(hash){
        console.log(request.body, hash)
        const user = new UserModel({name, email, pass: hash, role});
        await user.save();
        return response.status(201).json({message:"Registration Successful!"})
      }else{
        return response.status(400).json({message:"something went wrong at time of hashing", err})
      }
    
  });
    
  } catch (error) {
    response.status(400).json({message:"Please register again", error})
  }
})
// For user Login
userRouter.post("/login", async (request, response) => {
  const {pass, email} = request.body;
  try {
    const requireUser =  await UserModel.findOne({email})
    bcrypt.compare(pass, requireUser.pass , (err, result) => {
      if(result){
        const token = jwt.sign({userId:requireUser._id}, "cap01_046")
        request.currentUserId = requireUser?._id;
        console.log(request.currentUserId, "line 38")
        response.status(200).json({message:"Login Successful!", token})
      } else{
        response.status(400).json({message:"Invalid credential!", err})
      }
  });
    
  } catch (error) {
    response.status(400).json({message:"Login failed!!. Please try again!", error})
  }
})

// To get all the user from db
userRouter.get("/users", auth, authMiddleware(["admin"]), async (request, response) => {
  try {
    const users = await UserModel.find()
    // token = request.headers.authorization.split(" ")[1]
    // const decoded = jwt.verify(token, "cap01_046");
    
    response.json({message:"get all the users",users})

  } catch (error) {
    response.json({message:"there is some issue!"})
  }
});

userRouter.get("/movies", auth, authMiddleware(["user", "admin"]), (request, response) => {
  response.json({message: "Watching movies..."})
})
module.exports = {userRouter};
