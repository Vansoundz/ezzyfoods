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
import { RootReducer } from "../store/reducers/root";
import { useSelector } from "react-redux";

const Routes = () => {
  const { categories } = useSelector((state: RootReducer) => ({
    categories: state.product.categories,
  }));
  const l = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [l]);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/order" component={OList} />
      {categories &&
        categories.map((c, i) => {
          return <Route path={`/${c}`} key={i} component={Product} />;
        })}
      <Route path="/login" component={Login} />
      <ProtectedRoute path="/dashboard" component={Dashboard} />
      <ProtectedRoute path="/products" component={Products} />
      <ProtectedRoute path="/edit/:id" component={Edit} />
    </Switch>
  );
};

export default Routes;
