import React, { FC, Fragment } from "react";
import { useDispatch } from "react-redux";
import { markDelivered, markFailed } from "../../store/actions/orders";
import { OrderModel } from "../../models/order.model";

interface IProps {
  order: OrderModel;
}

const Order: FC<IProps> = ({ order }) => {
  const {
    // @ts-ignore
    customer: { nickname, phone },
    products,
    total,
  } = order;
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className="collapsible-header">
        <span>{nickname}</span>
        <span>{phone}</span>
      </div>
      <div className="collapsible-body">
        <ul className="collection">
          {products &&
            products.map((product) => {
              return (
                <li key={product.id} className="collection-item order-item">
                  <span>{product.name}</span>
                  <span>{product.quantity}</span>
                </li>
              );
            })}

          <li className="collection-item order-item">
            <span>Total: </span>
            <span>{total}</span>
          </li>
        </ul>
        <button
          onClick={() => {
            dispatch(markDelivered(order.id!));
          }}
          className="btn green accent-4"
        >
          <i className="material-icons">done</i>
        </button>
        <button
          onClick={() => {
            dispatch(markFailed(order.id!));
          }}
          className="btn red accent-4 right"
        >
          <i className="material-icons">close</i>
        </button>
      </div>
    </Fragment>
  );
};

export default Order;
