import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./style.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/root";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Loading from "./components/layout/Loading";
import "react-toastify/dist/ReactToastify.css";
import { getUser } from "./data/auth.data";
import { LOGIN } from "./store/actions/types";
import { BrowserRouter } from "react-router-dom";
import "@glidejs/glide/dist/css/glide.core.min.css";
import "@glidejs/glide/dist/css/glide.theme.min.css";

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
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

authState();
