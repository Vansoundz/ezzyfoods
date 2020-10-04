import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { LOGOUT } from "../../store/actions/types";
import { RootReducer } from "../../store/reducers/root";

const DashLayout: FC = ({ children }) => {
  const pathname = useLocation().pathname.slice(1);
  const routes = ["create", "products", "orders", "dashboard"];
  const dispatch = useDispatch();
  const { name } = useSelector((state: RootReducer) => ({
    name: state.auth.user.name,
  }));

  return (
    <div className="dash-container">
      <div className="dash-side">
        <div className="d-nav">
          <div className="logo">EzzyFoods</div>
          <ul className="d-nav-items">
            {routes.map((route, i) => (
              <li
                key={i}
                className={`${pathname === route ? "active" : ""} d-nav-item`}
              >
                <Link to={`/${route}`} style={{ textTransform: "capitalize" }}>
                  {route}
                </Link>
              </li>
            ))}

            {/* <li className="d-nav-item">
              <Link to="/products">View Products</Link>
            </li>
            <li className="d-nav-item">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="d-nav-item">
              <Link to="/stats">Stats</Link>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="dash-body">
        <div className="dash-app">
          <div className="user">{name}</div>
          <div
            onClick={() => {
              localStorage.removeItem("_eat");
              dispatch({
                type: LOGOUT,
              });
            }}
          >
            <i className="material-icons">power_settings_new</i>
          </div>
        </div>
        <div className="dash-content">{children}</div>
      </div>
    </div>
  );
};

export default DashLayout;
