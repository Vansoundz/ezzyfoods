import React, { useEffect } from "react";
import { loadSummary } from "../../store/actions/orders";

import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSummary());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div>
        <h4>Quick Insights</h4>
      </div>
    </div>
  );
};

export default Dashboard;
