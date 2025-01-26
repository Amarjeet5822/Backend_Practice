const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  userId:{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref:"users",
    require: true,
  },
  totalPrices: {
    type: Number,
    require: true,
    unique: true
  },
  product: [
    {
      title: { type: String, require: true},
      price: { type: Number, require: true},
      qty: { type: Number, require: true}
    }
  ]
},{
  versionKey: false
}
)

const OrderModel = mongoose.model("orders", orderSchema);

module.exports = { OrderModel}