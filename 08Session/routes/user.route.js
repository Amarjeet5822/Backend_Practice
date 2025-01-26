const express = require("express");
const { UserModel } = require("./userModel");
const userRoutes = express.Router()

// You will get all the user here
userRoutes.get("/", async (req, res ) => {
  const users = await UserModel.find()
  res.status(200).json({message:"All the users", users})
})
// Add user in DataBase
userRoutes.post("/add", async (req, res) => {
  const userData = req.body;
  try{
  const newUser = new UserModel(userData);
  await newUser.save()
  console.log("new user is added successfully in db");
  res.status(200).json({ message: "user added in db"})

  } catch(error) {
    console.log("error Adding user to db", error)
    res.status(404).json({ message: "failed to add user in db"})
  }
  
})
// update a user from db
userRoutes.patch("/:id", async (req, res) => {
  const userUpdate = req.body
  const {id} = req.params;
  await UserModel.findByIdAndUpdate({_id:id},userUpdate)
  res.status(200).json({ message: "user updation successfull in db"})
})

// delete single user using id from database
userRoutes.delete("/:id", async (req, res) => {
  const {id} = req.params;
  try {
    await UserModel.deleteOne({_id:id})
    res.status(200).json({message:"User is deleted"})
  } catch (error) {
    res.status(404).json({message:"Failed to delet user",error})
  }
})

module.exports = { userRoutes };