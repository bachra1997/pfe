const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    product: { type: ObjectId, ref: "Product" },
    nom: String,
    price: Number,
    count: Number
  },
 {    pizza: { type: ObjectId, ref: "Pizza" },
    nom: String,
    price: Number,
    count: Number},
  {  sandwich: { type: ObjectId, ref: "Sandwich" },
    nom: String,
    price: Number,
    count: Number},
     { dessert: { type: ObjectId, ref: "Dessert" },
    nom: String,
    price: Number,
    count: Number },
 
  {
    boisson: { type: ObjectId, ref: "Boisson" },
    nom: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
        pizzas: [CartItemSchema],
 sandwichs: [CartItemSchema],
  desserts: [CartItemSchema],
   boissons: [CartItemSchema],
    amount: { type: Number },
     tel: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Non traitée",
      enum: ["Non traitée", "En cours", "Livrée", "Annulée"] // enum maaneha objets de chaines
    },
    updated: Date,
    user: { type: ObjectId, ref: "User" }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
