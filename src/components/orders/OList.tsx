import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Order from "./Order";
import CompleteOrder from "./completeOrder";
import { RootReducer } from "../../store/reducers/root";

const OList = () => {
  const { orders } = useSelector((state: RootReducer) => ({
    orders: state.product.order,
  }));
  let total = 0;
  let temp = orders.length ? (
    <>
      {orders.map((order, index) => {
        total += parseInt(`${order.quantity}`) * parseFloat(`${order.price}`);
        return <Order order={order} index={index} key={index} />;
      })}
    </>
  ) : (
    <div className="center">
      <p>You have no order, make one ; )</p>
      <Link className="btn orange" to="/">
        Explore
      </Link>
    </div>
  );

  return (
    <div className="orders">
      <h5> Your Order </h5>
      <div className="order">
        <span>#</span>
        <span>Name</span>
        <span>Price</span>
        <span>Quantity</span>
        <span> Add</span>
        <span> Remove</span>
      </div>
      {temp}
      <div className="order">
        <span>#</span>
        <span>Total</span>
        <span>{total}</span>
        <span></span>
        <span> </span>
      </div>
      {orders.length && <CompleteOrder order={orders} total={total} />}
    </div>
  );
};

export default OList;
