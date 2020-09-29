import {
  MARK_DELIVERED,
  MARK_FAILED,
  PLACE_ORDER,
  LOAD_ORDERS,
  LOAD_SUMMARY,
} from "../actions/types";
import { orderAction } from "../actions/types.actions";
import { orderReducer } from "./types.reducers";

const initState: orderReducer = {
  orders: [],
  summary: {
    totalOrders: 0,
    successfulDeliveries: 0,
    deliveries: [],
    unsuccessfulDeliveries: 0,
    pendingOrders: 0,
    totalSales: 0,
  },
};

const orders = (state = initState, action: orderAction): orderReducer => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_SUMMARY:
      return {
        ...state,
        summary: payload,
      };
    case LOAD_ORDERS:
      return {
        ...state,
        orders: payload,
      };
    case PLACE_ORDER:
      let sm = state.summary;
      if (sm?.totalOrders) sm.totalOrders++;
      if (sm?.pendingOrders) sm.pendingOrders++;

      return {
        ...state,
        summary: sm,
        // @ts-ignore
        orders: [payload, ...state?.orders],
      };
    case MARK_DELIVERED:
      // const summary = state.summary;

      return {
        ...state,
        orders: state?.orders?.filter((ord) => ord.id !== payload),
      };
    case MARK_FAILED:
      const smr = state.summary;
      if (smr?.unsuccessfulDeliveries) smr.unsuccessfulDeliveries++;
      if (smr?.pendingOrders && smr.pendingOrders > 0) {
        smr.pendingOrders--;
      }
      localStorage.setItem("summary", JSON.stringify(state.summary));
      return {
        ...state,
        summary: smr,
        orders: state.orders?.filter((ord) => ord.id !== payload),
      };
    default:
      return state;
  }
};

export default orders;
