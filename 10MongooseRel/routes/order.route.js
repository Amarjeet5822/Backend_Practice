const express = require("express");
const { OrderModel } = require("../models/order.models");

const orderRouter = express.Router()

// add a new Order
orderRouter.post("/", async (request, response) => {
  const {body } = request;
  const newOrder = new OrderModel(body);
  await newOrder.save()
  response.status(201).send({"message": "New order added successfully", newOrder})
})
// Get all the orders
orderRouter.get("/", async (request, response) => {
  const orders = await OrderModel.find()
  response.status(200).send({"message": "fetched all the orders from db", orders})
})
module.exports = {orderRouter}