import React, { FC, useEffect, useState } from "react";
import { OrderModel } from "../../models/order.model";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { markDelivered, markFailed } from "../../data/order.data";
import Loading from "../layout/Loading";

interface IProps {
  order: OrderModel;
  refetch: () => void;
}

const Order: FC<IProps> = ({ order, refetch }) => {
  const [total, setTotal] = useState(0);
  const {
    // // @ts-ignore
    // customer: { name, phone },
    products,
    _id,
    quantities,
  } = order;

  const [deliver, { isLoading }] = useMutation(markDelivered);
  const [failed, { isLoading: loading }] = useMutation(markFailed);

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
      {(isLoading || loading) && <Loading />}
      <div>
        <div className="orders-header">
          <div>
            <h4>{order.customer?.name}</h4>
            <div>{order.customer?.phone}</div>
          </div>
        </div>
        <div className="order-item">
          <span style={{ fontWeight: "bold" }}>Name</span>
          <span style={{ fontWeight: "bold" }}>Price</span>
          <span style={{ fontWeight: "bold" }}>Quantity</span>
          <span style={{ fontWeight: "bold" }}>Amount</span>
        </div>
        <div className="orders-body">
          <ul className="">
            {products &&
              products.map((product) => {
                return (
                  <li key={product._id} className="order-item">
                    <span>{product.name}</span>
                    <span>{product.price}</span>
                    {/**@ts-ignore */}
                    <span>{quantities[product?._id]}</span>

                    {/**@ts-ignore */}
                    <span>{quantities[product?._id] * product.price}</span>
                  </li>
                );
              })}

            <li className="order-item">
              <span style={{ gridColumn: "1 / 4", fontWeight: "bold" }}>
                Total:{" "}
              </span>
              <span style={{ fontWeight: "bold" }}>{total}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="order-actions">
        <button
          onClick={async () => {
            await failed({ id: _id! });
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
            await deliver({ id: _id! });
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
