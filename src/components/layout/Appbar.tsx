import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/auth";
import { RootReducer } from "../../store/reducers/root";

const Appbar = () => {
  const { isAuthenticated, order } = useSelector((state: RootReducer) => ({
    order: state.product.order,
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const dispatch = useDispatch();

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
          {/**<li>
              <i className='material-icons'>search</i>
            </li> **/}
          <li>
            <Link to="/order">
              <i className="material-icons">shopping_cart</i>
              {badge}
            </Link>
          </li>
          {isAuthenticated && (
            <Fragment>
              <li>
                <i onClick={() => dispatch(logout)} className="material-icons">
                  logout
                </i>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;
