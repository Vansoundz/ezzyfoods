import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { ProductModel } from "../../models/product.model";
import { ADD_TO_CART, REMOVE_ORDER } from "../../store/actions/types";

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
      <span>{order.q}</span>
      <span
        onClick={() => {
          dispatch({
            type: ADD_TO_CART,
            payload: order,
          });
        }}
      >
        <i className="material-icons">add</i>
      </span>
      <span
        onClick={() => {
          dispatch({ type: REMOVE_ORDER, payload: order });
        }}
      >
        <i className="material-icons">remove</i>
      </span>
    </div>
  );
};

export default Order;
