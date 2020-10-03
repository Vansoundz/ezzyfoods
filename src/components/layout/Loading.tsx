import React from "react";
import { ScaleLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        zIndex: 1024,
        background: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScaleLoader />
    </div>
  );
};

export default Loading;
