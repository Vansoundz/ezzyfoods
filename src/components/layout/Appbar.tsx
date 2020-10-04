import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";

const Appbar = () => {
  const { order } = useSelector((state: RootReducer) => ({
    order: state.product.order,
  }));

  const [appName] = useState("EzzyFoods");

  const badge = order.length ? (
    <span className="accent-2 badge">{order.length}</span>
  ) : null;

  return (
    <nav className="orange appbar">
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          {appName}
        </Link>
        <ul className="right">
          <li>
            <Link to="/order" style={{ position: "relative" }}>
              <i className="material-icons" style={{ color: "#fff" }}>
                shopping_cart
              </i>
              {badge}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;
