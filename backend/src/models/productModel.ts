import mongoose, { Document, Schema } from "mongoose";
import { eCommerceDB } from "./mongoConnection";

export interface Iproduct extends Document {
  title: string;
  image: string;
  price: number;
  stock: number;
}

export const productSchema: Schema = new Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
});



export const productModel = eCommerceDB.model<Iproduct>(
  "products",
  productSchema
);
