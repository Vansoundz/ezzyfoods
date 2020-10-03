import { ProductModel } from "../../models/product.model";
import {
  ADD_TO_CART,
  REMOVE_ORDER,
  REMOVE_PRODUCT,
  CLEAR_ORDER,
  CREATE_CATEGORY,
  LOAD_CATEGORIES,
  LOAD_PRODUCTS,
  LOAD,
} from "../actions/types";
import { ProductAction } from "../actions/types.actions";
import { productReducer as pR } from "./types.reducers";

const initState: pR = {
  products: [],
  categories: ["fruits", "juices", "meals", "snacks"],
  order: [],
  loading: false,
};

const compare = (a: any, b: any) => {
  const prodA = a.name.toUpperCase();
  const prodB = b.name.toUpperCase();

  let comparison = 0;
  if (prodA > prodB) {
    comparison = 1;
  } else if (prodA < prodB) {
    comparison = -1;
  }
  return comparison;
};

const productReducer = (state = initState, action: ProductAction): pR => {
  const { type, payload } = action;
  switch (type) {
    case LOAD:
      return {
        ...state,
        loading: true,
      };
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case ADD_TO_CART:
      let order: ProductModel = payload;
      let myOrder = state.order;
      let present = myOrder.find((ord) => ord._id === order._id);
      if (present)
        myOrder = myOrder.map((ord) => {
          if (ord._id === order._id) {
            if (ord?.q) ord.q++;
          }
          return ord;
        });
      else {
        order.q = 1;
        myOrder = [...myOrder, order];
      }

      let sortedOrd = myOrder.sort(compare);

      return {
        ...state,
        order: [...sortedOrd],
        loading: false,
      };
    case REMOVE_ORDER:
      let curOrders = state.order;
      let ord = curOrders.find((o) => o._id === payload._id);
      if (ord) {
        if (ord.q)
          if (ord?.q > 1) {
            curOrders = curOrders.map((order) => {
              if (order._id === ord?._id) {
                if (order.q) order.q--;
              }
              return order;
            });
          } else
            curOrders = curOrders.filter((order) => order._id !== payload._id);
      }
      // curOrders = curOrders.filter((ord) => ord.id !== payload.id);
      let sorted = curOrders.sort(compare);

      return {
        ...state,
        order: [...sorted],
        loading: false,
      };
    case REMOVE_PRODUCT:
      var orders: ProductModel[] = [];
      if (state.order.includes(payload)) {
        orders = state.order.filter((product) => product._id !== payload._id);
      }
      return {
        ...state,
        order: [...orders],
      };
    case CLEAR_ORDER:
      return {
        ...state,
        order: [],
        loading: false,
      };
    case CREATE_CATEGORY:
      const categories = [...state.categories, payload];
      return {
        ...state,
        categories,
        loading: false,
      };
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default productReducer;
