import React, { FC } from "react";
import Appbar from "./Appbar";
import BottomNav from "./BottomNav";

const AppLayout: FC = ({ children }) => {
  return (
    <>
      <div className="app">
        <Appbar />
        <div className="container">{children}</div>
        <BottomNav />
      </div>
    </>
  );
};

export default AppLayout;
