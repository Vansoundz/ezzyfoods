import Axios from "axios";
import { OrderModel } from "../models/order.model";
import { setAuthHeader } from "./util";
import { config } from "dotenv";

config();

const api = process.env.REACT_APP_EZZYFOODS_API;

export default {
  placeOrder(order: OrderModel) {
    const quantities = {};
    order.products?.forEach((product) => {
      // @ts-ignore
      quantities[product._id] = product.q;
    });
    const products = order.products?.map((product) => product._id);

    const newOrder = {
      products,
      quantities,
      customer: order.customer,
    };

    return Axios.post(`${api}/orders`, { ...newOrder });
  },
  getOrders() {
    return Axios.get(`${api}/orders`, setAuthHeader());
  },
  getFailedOrders() {
    return Axios.get(`${api}/orders/failed`, setAuthHeader());
  },
  getDeliveredOrders() {
    return Axios.get(`${api}/orders/delivered`, setAuthHeader());
  },
  getStats() {
    return Axios.get(`${api}/orders/stats`, setAuthHeader());
  },

  delete(id: string) {
    return Axios.delete(`${api}/orders/${id}`, setAuthHeader());
  },
};
