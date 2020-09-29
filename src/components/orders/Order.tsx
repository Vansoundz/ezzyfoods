import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { addToCart, removeOrder } from "../../store/actions/product";
import { ProductModel } from "../../models/product.model";

interface IProps {
  order: ProductModel;
  index: number;
}

const Order: FC<IProps> = ({ order, index }) => {
  const dispatch = useDispatch();
  return (
    <div className="order">
      <span>{index + 1}</span>
      <span>{order.name}</span>
      <span>{order.price}</span>
      <span>{order.quantity}</span>
      <span
        onClick={() => {
          dispatch(addToCart(order));
        }}
      >
        <i className="material-icons">add</i>
      </span>
      <span
        onClick={() => {
          dispatch(removeOrder(order));
        }}
      >
        <i className="material-icons">remove</i>
      </span>
    </div>
  );
};

export default Order;
