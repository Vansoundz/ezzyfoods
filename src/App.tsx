import React from "react";
import Routes from "./Routes/Routes";
import { BrowserRouter } from "react-router-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";

const App = () => {
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
