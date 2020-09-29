import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadOrders } from "../../store/actions/orders";
import M from "materialize-css";
import DOrder from "./DOrder";
import { RootReducer } from "../../store/reducers/root";

const List = () => {
  const { orders } = useSelector((state: RootReducer) => ({
    orders: state.orders.orders,
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    var elems = document.querySelectorAll(".collapsible");
    M.Collapsible.init(elems);
  });

  useEffect(() => {
    dispatch(loadOrders());
  }, [dispatch]);

  return (
    <ul className="collapsible">
      {orders?.length === 0 ? (
        <h6>No orders currently</h6>
      ) : (
        orders &&
        orders.map((order) => {
          return (
            <li key={order.id}>
              <DOrder order={order} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default List;
