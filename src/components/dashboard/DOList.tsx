import React, { useEffect, useState } from "react";
import DOrder from "./DOrder";
import { useQuery } from "react-query";
import { getOrders } from "../../data/order.data";
import Loading from "../layout/Loading";
import { OrderModel } from "../../models/order.model";
import moment from "moment";

const List = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [classified, setClassified] = useState<OrderModel[][]>([]);
  const { data, isLoading, refetch } = useQuery("Get orders", getOrders);

  useEffect(() => {
    if (data?.orders) {
      setOrders(
        // @ts-ignore
        data.orders.sort((a, b) => moment(b.date).diff(moment(a.date)))
      );
    }
  }, [data]);

  const classifyArray = (arr: OrderModel[]) => {
    let classified: OrderModel[][] = [];
    let criteria = "";
    let start = 0;
    let end = 0;

    arr = [...arr, {}];

    arr.forEach((order) => {
      let localCriteria = moment(order.date).format("LL");
      if (start === end) {
        criteria = localCriteria;
      }

      if (localCriteria !== criteria) {
        classified = [...classified, arr.slice(start, end)];
        start = end;
        criteria = localCriteria;
      }
      end++;
    });

    return classified;
  };
  useEffect(() => {
    if (orders.length > 0) {
      setClassified(classifyArray(orders));
    }
  }, [orders]);

  return (
    <>
      {isLoading && <Loading />}
      {orders?.length === 0 ? (
        <h6>No orders currently</h6>
      ) : (
        <div>
          <div
            style={{
              fontSize: `24px`,
              fontWeight: 200,
            }}
          >
            Orders
          </div>
          {classified.length > 0 && (
            <div>
              {classified.map((orders, i) => {
                return (
                  <div key={i} className="orders-collection">
                    <h3 style={{ marginBottom: "16px" }}>
                      {moment(orders[0].date).format("LL")}
                    </h3>
                    <ul className="dash-orders">
                      {orders &&
                        orders.map((order) => {
                          return (
                            <li key={order._id} className="dash-order">
                              <DOrder refetch={refetch} order={order} />
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default List;
