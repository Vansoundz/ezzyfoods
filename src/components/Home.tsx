import React from "react";
import AppLayout from "./layout/AppLayout";
import PList from "./product/Plist";

const Home = () => {
  return (
    <div>
      <AppLayout>
        <PList />
      </AppLayout>
    </div>
  );
};

export default Home;
