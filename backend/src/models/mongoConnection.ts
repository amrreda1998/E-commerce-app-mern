import mongoose from "mongoose";

//determine the database you want to connect
export const eCommerceDB = mongoose.connection.useDb("e-commerce");