import mongoose, { ObjectId } from "mongoose";
import { Schema, Document } from "mongoose";

//create a database model for orders

//create an interface for every order item
export interface IOrderItem {
  title: string;    
  image: string;
  unitPrice: number;
  quantity: number;
}
//create the order item schema
const orderItemSchema: Schema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

//create an interface for orders
interface IOrder extends Document {
  userID: string | ObjectId;
  address: string;
  orderItems: IOrderItem[];
  totalPrice: number;
}

//create the order schema
const orderSchema: Schema = new Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  address: { type: String, required: true },
  orderItems: [orderItemSchema],
  totalPrice: { type: Number, required: true },
});

//determine the database you want to connect
const eCommerceDB = mongoose.connection.useDb("e-commerce");
//create the order model to communicate with database collections
export const orderModel = eCommerceDB.model<IOrder>("orders", orderSchema);
