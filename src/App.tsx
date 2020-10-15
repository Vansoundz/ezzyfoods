import React from "react";
import Routes from "./Routes/Routes";

import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        hideProgressBar={true}
        autoClose={1000}
      />
    </>
  );
};

export default App;
