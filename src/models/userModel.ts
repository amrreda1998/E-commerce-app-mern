import mongoose, { Schema, Document } from "mongoose";

//define the document type for typescript
interface Iuser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

//define the schema in mongodb (the shape / type of data and restriction on it in the db)
const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

//determine the database you want to connect
const eCommerceDB = mongoose.connection.useDb("e-commerce");

export const userModel = eCommerceDB.model<Iuser>("users", userSchema);
