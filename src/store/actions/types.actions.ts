import {
  ADD_TO_CART,
  AUTH_ERROR,
  CLEAR_ORDER,
  CREATE_CATEGORY,
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  LOAD,
  LOAD_CATEGORIES,
  LOAD_ORDERS,
  LOAD_PRODUCTS,
  LOAD_SUMMARY,
  LOGIN,
  LOGOUT,
  MARK_DELIVERED,
  MARK_FAILED,
  PLACE_ORDER,
  REMOVE_ORDER,
  REMOVE_PRODUCT,
  SET_LOADING,
  USER_LOADED,
} from "./types";

interface ProductAction {
  type:
    | typeof LOAD
    | typeof LOAD_PRODUCTS
    | typeof ADD_TO_CART
    | typeof REMOVE_ORDER
    | typeof REMOVE_PRODUCT
    | typeof CLEAR_ORDER
    | typeof CREATE_CATEGORY
    | typeof LOAD_CATEGORIES
    | typeof CREATE_PRODUCT
    | typeof EDIT_PRODUCT
    | typeof DELETE_PRODUCT;
  payload?: any;
}

interface orderAction {
  type:
    | typeof LOAD_SUMMARY
    | typeof LOAD_ORDERS
    | typeof PLACE_ORDER
    | typeof MARK_DELIVERED
    | typeof MARK_FAILED;
  payload?: any;
}

interface authAction {
  type:
    | typeof LOGIN
    | typeof USER_LOADED
    | typeof AUTH_ERROR
    | typeof LOGOUT
    | typeof SET_LOADING;
  payload?: any;
}

export type { ProductAction, orderAction, authAction };
