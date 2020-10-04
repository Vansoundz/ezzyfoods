import React, { useEffect } from "react";
// import Appbar from "./components/layout/Appbar";
// import BottomNav from "./components/layout/BottomNav";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { loadProducts } from "./store/actions/product";
import { useDispatch } from "react-redux";
import { clearOrder } from "./store/actions/product";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOrder());
    dispatch(loadProducts());
  });
  return (
    <BrowserRouter>
      <Routes />
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={1000}
      />
    </BrowserRouter>
  );
};

export default App;
