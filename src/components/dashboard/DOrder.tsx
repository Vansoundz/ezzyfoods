import React, { FC, useEffect, useState } from "react";
import { OrderModel } from "../../models/order.model";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { deleteOrder } from "../../data/order.data";

interface IProps {
  order: OrderModel;
  refetch: () => void;
}

const Order: FC<IProps> = ({ order, refetch }) => {
  const [total, setTotal] = useState(0);
  const {
    // @ts-ignore
    customer: { name, phone },
    products,
    _id,
    quantities,
  } = order;

  const [deleteProd] = useMutation(deleteOrder);

  useEffect(() => {
    let t = 0;
    products?.forEach((product) => {
      // @ts-ignore
      t += product?.price * quantities[product._id];
    });

    if (t) {
      setTotal(t);
    }
  }, [setTotal, products, quantities]);

  // const dispatch = useDispatch();

  return (
    <>
      <div>
        <div className="orders-header">
          <div>
            <h4>{name}</h4>
            <div>{phone}</div>
          </div>
          <div>
            <span>{total}</span>
          </div>
        </div>
        <div className="orders-body">
          <ul className="">
            {products &&
              products.map((product) => {
                return (
                  <li key={product._id} className="order-item">
                    <span>{product.name}</span>
                    {/**@ts-ignore */}
                    <span>{quantities[product?._id]}</span>
                  </li>
                );
              })}

            <li className="order-item">
              <span>Total: </span>
              <span>{total}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="order-actions">
        <button
          onClick={async () => {
            await deleteProd({ id: _id! });
            refetch();
            toast("Order not delivered", {
              type: "error",
              position: "bottom-right",
            });
          }}
          className="btn red "
        >
          <i className="material-icons">close</i>
        </button>
        <button
          onClick={async () => {
            await deleteProd({ id: _id! });
            refetch();
            toast("Order delivered successfully", {
              type: "success",
              position: "bottom-right",
            });
          }}
          className="btn green"
        >
          <i className="material-icons">done</i>
        </button>
      </div>
    </>
  );
};

export default Order;
