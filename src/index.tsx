import React from "react";
import { render } from "react-dom";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./store/reducers/root";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from "./firebase/init";

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const authState = async () => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      store.dispatch({
        type: "USER_LOADED",
        payload: user,
      });
      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("root")
      );
    } else {
      store.dispatch({
        type: "AUTH_ERROR",
      });

      render(
        <Provider store={store}>
          <App />
        </Provider>,
        document.getElementById("root")
      );
    }
  });
  render(
    <>
      <div className="preloader-wrapper big active">
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
          <div className="gap-patch">
            <div className="circle"></div>
          </div>
          <div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("root")
  );
};

authState();
