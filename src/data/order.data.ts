import orderApi from "../api/order.api";
import { OrderModel } from "../models/order.model";

const placeOrder = async ({ order }: { order: OrderModel }) => {
  try {
    let resp = (await orderApi.placeOrder(order)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return "Error";
  }
};

const getOrders = async () => {
  try {
    let resp = (await orderApi.getOrders()).data;
    return resp;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return "Error";
  }
};

const deleteOrder = async ({ id }: { id: string }) => {
  try {
    let resp = (await orderApi.delete(id)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
    return "Error";
  }
};

export { getOrders, placeOrder, deleteOrder };
