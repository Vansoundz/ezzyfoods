import React from "react";
import { render } from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/root";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import firebase from "./firebase/init";
import Loading from "./components/layout/Loading";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./data/auth.data";
import { LOGIN } from "./store/actions/types";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const authState = async () => {
  render(
    <>
      <Loading />
    </>,
    document.getElementById("root")
  );

  let data;

  try {
    data = await getUser();
  } catch (error) {
    console.log(error);
  }

  if (data?.user) {
    store.dispatch({
      type: LOGIN,
      payload: data.user,
    });
  } else {
    store.dispatch({
      type: "AUTH_ERROR",
    });
  }
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
};

authState();
