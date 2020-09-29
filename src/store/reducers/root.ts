import { combineReducers } from "redux";
import product from "./product";
import auth from "./auth";
import orders from "./orders";

const rootReducer = combineReducers({
  product,
  auth,
  orders,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
