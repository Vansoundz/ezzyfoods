import React, { useEffect } from "react";
import Appbar from "./components/layout/Appbar";
import BottomNav from "./components/layout/BottomNav";
import Routes from "./Routes/Routes";
import { BrowserRouter, Link } from "react-router-dom";
import "./style.css";
import { loadProducts } from "./store/actions/product";
import { useDispatch } from "react-redux";
import { clearOrder } from "./store/actions/product";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearOrder());
    dispatch(loadProducts());
  });
  return (
    <BrowserRouter>
      <div className="app">
        <Appbar />
        <div className="container">
          <Link to="/login" className="btn-floating green accent-4 br">
            <i className="material-icons">account_circle</i>
          </Link>
          <Routes />
        </div>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
};

export default App;
