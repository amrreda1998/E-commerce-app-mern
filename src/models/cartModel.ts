import mongoose, { Document, Schema } from "mongoose";
import { Iproduct } from "./productModel";

// const cartStatus = ["active", "completed"];

//interface for cart item
export interface ICartItem  {
  item: string;
  unitPrice: number;
  quantity: number;
}
//interface for cart
interface ICart extends Document {
  userID: mongoose.Types.ObjectId | string;
  items: ICartItem[];
  totalPrice: number;
  status: string;
}

const cartItemSchema: Schema = new Schema({
  item: { type: mongoose.Types.ObjectId, ref: "products", required: true },
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const cartSchema: Schema = new Schema({
  userID: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  items: [cartItemSchema],
  totalPrice: { type: Number, default: 0 },
  status: { type: String, default: "active" },
});

//determine the database you want to connect
const eCommerceDB = mongoose.connection.useDb("e-commerce");
export const cartModel = eCommerceDB.model<ICart>("carts", cartSchema);
