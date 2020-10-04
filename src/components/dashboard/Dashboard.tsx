import React from "react";
import { Line } from "react-chartjs-3";
import Stats from "./Summary";

const data = {
  labels: [
    "28th Sep",
    "29th Sep",
    "30th Sep",
    "1st Oct",
    "2nd Oct",
    "3rd Oct",
    "4th Oct",
  ],
  datasets: [
    {
      label: "Sales",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const Dashboard = () => {
  return (
    <div
      className="dashboard"
      style={{
        marginBottom: "40px",
      }}
    >
      <div
        style={{
          width: "700px",
          margin: "auto",
          paddingTop: "24px",
          marginBottom: "40px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 200,
            marginBottom: "16px",
          }}
        >
          Dashboard
        </div>
        <Stats />
      </div>
      <div
        className="chart"
        style={{
          width: "700px",
          height: "400px",
          margin: "auto",
          paddingTop: "24px",
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 200,
            marginBottom: "16px",
          }}
        >
          Sales Overview
        </div>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
