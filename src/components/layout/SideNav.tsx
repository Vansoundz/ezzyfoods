import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";

const SideNav = () => {
  const { categories } = useSelector((state: RootReducer) => ({
    categories: state.product.categories,
  }));

  return (
    <ul id="slide-out" className="sidenav">
      <span>
        <li>
          <NavLink className="sidenav-close" exact to="/">
            All
          </NavLink>
        </li>
        {categories &&
          categories.map((category, i) => {
            return (
              <li key={i}>
                <NavLink className="sidenav-close" to={`/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            );
          })}
      </span>
    </ul>
  );
};

export default SideNav;
