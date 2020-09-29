import {
  MARK_DELIVERED,
  MARK_FAILED,
  LOAD_ORDERS,
  LOAD_SUMMARY,
} from "./types";
// import { setAlert } from './alerts'
// import uuid from 'uuid/v4'
import firebase from "../../firebase/init";
import { Dispatch } from "redux";
import { OrderModel } from "../../models/order.model";

export const loadSummary = () => (dispatch: Dispatch) => {
  const summary = JSON.parse(localStorage.getItem("summary") || "{}");
  if (summary) {
    dispatch({
      type: LOAD_SUMMARY,
      payload: summary,
    });
  }
};

export const loadOrders = () => (dispatch: Dispatch) => {
  const { firestore } = firebase;
  firestore()
    .collection("orders")
    .onSnapshot((snap) => {
      const orders: OrderModel[] = [];
      snap.forEach((doc) => {
        const order = doc.data();
        order.id = doc.id;
        orders.push(order);
      });
      dispatch({
        type: LOAD_ORDERS,
        payload: orders,
      });
    });
};

export const placeOrder = async (order: OrderModel) => {
  const { firestore } = firebase;
  // order.id = uuid()
  order.time = Date.now();
  await firestore().collection("orders").add(order);
  return;
};

export const markDelivered = (id: string) => async (dispatch: Dispatch) => {
  const { firestore } = firebase;
  await firestore().collection("orders").doc(id).delete();
  dispatch({
    type: MARK_DELIVERED,
    payload: id,
  });
};

export const markFailed = (id: string) => async (dispatch: Dispatch) => {
  const { firestore } = firebase;
  await firestore().collection("orders").doc(id).delete();
  dispatch({
    type: MARK_FAILED,
    payload: id,
  });
};
