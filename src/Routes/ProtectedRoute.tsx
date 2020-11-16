import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/reducers/root";

// @ts-ignore
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, isAdmin } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.user?.isAdmin,
  }));
  const t = localStorage._eat;
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuthenticated && isAdmin && t ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default ProtectedRoute;
