import { IOrderItem, orderModel } from "../../models/orderModel";

export interface IOrder {
  userID: string;
  address: string;
  orderItems: IOrderItem[];
  totalPrice: number;
}

export const getAllOrders = async (userID: string) => {
  try {
    // Talk to orders model to get all user orders
    const allOrders = await orderModel.find({ userID: userID });

    if (allOrders) {
      return { status: 200, data: allOrders };
    } else {
      return { status: 404, data: "No orders found" };
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { status: 500, data: "Something went wrong" };
  }
};
