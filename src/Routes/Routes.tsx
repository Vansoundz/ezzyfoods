import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home";
import OList from "../components/orders/OList";
import Product from "../components/menu/Product";
import Login from "../components/auth/Login";
import Dashboard from "../components/dashboard/Dashboard";
import Products from "../components/dashboard/Products";
import Edit from "../components/dashboard/Edit";
import DashLayout from "../components/layout/DashLayout";
import List from "../components/dashboard/DOList";
import Create from "../components/dashboard/Create";
import Summary from "../components/dashboard/Summary";
import Register from "../components/auth/Register";
// import { useQuery } from "react-query";
// import { getCategories } from "../data/product.data";

const Routes = () => {
  // const [categories, setCategories] = useState<{ name: string; _id: string }[]>(
  //   []
  // );
  // const { data } = useQuery("get categories", getCategories);

  // useEffect(() => {
  //   if (data?.categories) {
  //     setCategories(data.categories);
  //   }
  // }, [data]);

  const l = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [l]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/order" component={OList} />
      <Route path="/products/:category" component={Product} />
      {/* {categories &&
        categories.map(({ name }, i) => {
          return <Route path={`/${name}`} key={i} component={Product} />;
        })} */}
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <DashLayout>
        <ProtectedRoute path="/dashboard" component={Dashboard} />
        <ProtectedRoute path="/products" component={Products} />
        <ProtectedRoute path="/edit/:id" component={Edit} />
        <ProtectedRoute path="/create" component={Create} />
        <ProtectedRoute path="/orders" component={List} />
        <ProtectedRoute path="/stats" component={Summary} />
      </DashLayout>
    </Switch>
  );
};

export default Routes;
