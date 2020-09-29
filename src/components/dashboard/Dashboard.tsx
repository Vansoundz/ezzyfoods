import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";
import List from "./DOList";
import Create from "./Create";
import Summary from "./Summary";
// import { createProduct } from '../../store/actions/product'
import { loadSummary } from "../../store/actions/orders";

import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    var el = document.querySelectorAll(".scrollspy");
    M.ScrollSpy.init(el);

    var elems = document.querySelector(".dropdown-trigger")!;
    M.Dropdown.init(elems);

    dispatch(loadSummary());
  }, [dispatch]);

  return (
    <>
      <div className="dash">
        <>
          <button
            data-target="actions"
            className="dropdown-trigger btn btn-floating orange more dropdown-trigger"
          >
            <i className="material-icons">add</i>
          </button>
        </>

        <ul id="actions" className="dropdown-content">
          <li>
            <a href="#orders">Orders</a>
          </li>
          <li>
            <a href="#summary">Summary</a>
          </li>
          <li>
            <a href="#create">Create</a>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
        <div className="dash">
          <div id="orders" className="section scrollspy pushpin">
            <h4>Orders</h4>
            <List />
          </div>

          <div id="summary" className="section scrollspy pushpin">
            <div className="row">
              <h4 className="col s10">Summary </h4>
              <div className=" col s2">
                <button
                  onClick={() => {
                    localStorage.setItem(
                      "summary",
                      JSON.stringify({
                        totalOrders: 0,
                        successfulDeliveries: 0,
                        deliveries: [],
                        unsuccessfulDeliveries: 0,
                        pendingOrders: 0,
                        totalSales: 0,
                      })
                    );
                    loadSummary();
                  }}
                  className="btn btn-floating red accent-3"
                >
                  <i className="material-icons">delete</i>
                </button>
              </div>
            </div>
            <Summary />
          </div>

          <div id="create" className="section scrollspy pushpin">
            <h4>Create </h4>
            <Create />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
