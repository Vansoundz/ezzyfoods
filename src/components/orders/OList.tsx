import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Order from "./Order";
import CompleteOrder from "./completeOrder";
import { RootReducer } from "../../store/reducers/root";
import AppLayout from "../layout/AppLayout";

const OList = () => {
  const { orders } = useSelector((state: RootReducer) => ({
    orders: state.product.order,
  }));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let t = 0;
    orders.forEach((order) => {
      t += parseInt(`${order.q}`) * parseFloat(`${order.price}`);
    });
    setTotal(t);
  }, [orders]);

  return (
    <AppLayout>
      <div className="orders">
        <h5> Your Order </h5>
        <div className="order" style={{ fontWeight: "bold" }}>
          <span>#</span>
          <span>Name</span>
          <span>Price</span>
          <span>Quantity</span>
          <span> Add</span>
          <span> Remove</span>
        </div>
        {orders.length > 0 ? (
          <>
            {orders.map((order, index) => {
              return <Order order={order} index={index} key={index} />;
            })}
          </>
        ) : (
          <div className="center">
            <p>You have no order, make one ; {")"}</p>
            <Link className="btn orange" to="/">
              Explore
            </Link>
          </div>
        )}
        {total > 0 && (
          <div className="order">
            <span>#</span>
            <span>Total</span>
            <span>{total}</span>
            <span></span>
            <span> </span>
          </div>
        )}
        {orders.length > 0 && <CompleteOrder order={orders} total={total} />}
      </div>
    </AppLayout>
  );
};

export default OList;
