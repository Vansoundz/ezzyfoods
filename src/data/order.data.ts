import orderApi from "../api/order.api";
import { IStats, OrderModel } from "../models/order.model";

const placeOrder = async ({ order }: { order: OrderModel }) => {
  try {
    let resp = (await orderApi.placeOrder(order)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const getOrders = async (): Promise<{ orders: OrderModel[] }> => {
  try {
    let resp = (await orderApi.getOrders()).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const getDeliveredOrders = async (): Promise<{ orders: OrderModel[] }> => {
  try {
    let resp = (await orderApi.getDeliveredOrders()).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const getFailedOrders = async (): Promise<{ orders: OrderModel[] }> => {
  try {
    let resp = (await orderApi.getFailedOrders()).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const getStats = async (): Promise<IStats> => {
  try {
    let resp = (await orderApi.getStats()).data;
    return resp.stats;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const deleteOrder = async ({ id }: { id: string }) => {
  try {
    let resp = (await orderApi.delete(id)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const markDelivered = async ({ id }: { id: string }) => {
  try {
    let resp = (await orderApi.markDelivered(id)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

const markFailed = async ({ id }: { id: string }) => {
  try {
    let resp = (await orderApi.markFailed(id)).data;
    return resp;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.errors);
    }
    throw new Error("Error");
  }
};

export {
  getOrders,
  placeOrder,
  deleteOrder,
  getDeliveredOrders,
  getFailedOrders,
  getStats,
  markDelivered,
  markFailed,
};
