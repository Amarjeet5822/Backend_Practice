const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()
const { UserModel } = require("../models/user.model");
const { auth } = require("../middlewares/auth");
const { checkAccess } = require("../middlewares/checkAccess");
const { blackListed } = require("../src/blacklist");
const userRouter = express.Router();

// Get all users => Only admin
userRouter.get("/",auth, ckeckAccess("admin"), async (request, response) => {
  try{
    const users = await UserModel.find()
    response.json(users)
  } catch(error){
    response.status(500).json(error)
  }
});

userRouter.get("/only-author-route", auth, checkAccess("author"), (request, response) => {
  response.json({message:"Hey Author!!"})
});

// Register 
userRouter.post("/register", async (request, response) => {
  try {
    const {username, pass, role} = request.body
    const hashedPassword = bcrypt.hash(pass, 10)
    const newUser = new UserModel({username, pass:hashedPassword, role})
    const savedUser = await newUser.save()
    response.status(201).json({message:"Registered Successfully", savedUser})
  } catch (error) {
    response.status(400).json(error);
  }
})

// login
userRouter.get("/login", async (request, response) => {
  const { username, pass} = request.body;
  try{
    const currUser = await UserModel.findOne({username});
    if(!currUser){
      response.status(404).json({err: "User not found!"})
    }
    const isValidPassword = bcrypt.compare(pass, currUser.pass);
    if(!isValidPassword){
      response.status(400).json({err: "Invalid Credential!"})
    }
    const token = jwt.sign({_id: currUser._id, role: currUser.role}, process.env.SECRET_KEY, { expiresIn: "24h" })
    response.status(200).json({ message:"Login Successfull", token, userId: currUser._id })
  }catch(error){
    response.status(400).json(error);
  }
})

// logout
userRouter.get("/logout", (request, response ) => {
  const token = request.headers["authorization"].split(" ")[1]
  blackListed.push(token) 
  response.json({message:"logout successfully"})
})
module.exports = {userRouter}
