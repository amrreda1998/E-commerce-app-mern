
import express from "express";
export const testRouter = express.Router();

testRouter.get("/",async (req, res) => {
    try {
      res.status(200).send({ data: "server is working" });
    } catch (err) {
      res.status(400).send({ message: "Error" });
    }
  })