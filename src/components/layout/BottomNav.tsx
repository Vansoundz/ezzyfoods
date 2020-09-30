import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./SideNav";
import { NavLink } from "react-router-dom";
import { loadCategories } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";

const BottomNav = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div>
      <SideNav />
      <div className="bottom orange">
        {isAuthenticated && (
          <Fragment>
            <NavLink to="/dashboard">
              <i className="material-icons">dashboard</i>
            </NavLink>
          </Fragment>
        )}
        <NavLink to="/" exact>
          <i className="material-icons">home</i>
        </NavLink>
        <span data-target="slide-out" className="sidenav-trigger">
          <i data-target="slide-out" className="sidenav-trigger material-icons">
            menu
          </i>
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
