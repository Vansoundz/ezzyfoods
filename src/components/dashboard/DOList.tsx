import React, { useEffect, useState } from "react";
import DOrder from "./DOrder";
import { useQuery } from "react-query";
import { getOrders } from "../../data/order.data";
import Loading from "../layout/Loading";
import { OrderModel } from "../../models/order.model";

const List = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { data, isLoading, refetch } = useQuery("Get orders", getOrders);

  useEffect(() => {
    if (data?.orders) {
      setOrders(data.orders);
    }
  }, [data]);

  return (
    <ul className="dash-orders">
      {isLoading && <Loading />}
      {orders?.length === 0 ? (
        <h6>No orders currently</h6>
      ) : (
        orders &&
        orders.map((order) => {
          return (
            <li key={order._id} className="dash-order">
              <DOrder refetch={refetch} order={order} />
            </li>
          );
        })
      )}
    </ul>
  );
};

export default List;
