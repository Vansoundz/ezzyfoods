import React, { useEffect, useState } from "react";
import DOrder from "./DOrder";
import { useQuery } from "react-query";
import {
  getDeliveredOrders,
  getFailedOrders,
  getOrders,
} from "../../data/order.data";
import Loading from "../layout/Loading";
import { OrderModel } from "../../models/order.model";
import moment from "moment";

enum Tabs {
  pending,
  delivered,
  failed,
}

const classifyArray = (arr: OrderModel[]) => {
  let classified: OrderModel[][] = [];
  let criteria = "";
  let start = 0;
  let end = 0;
  // console.log(arr);

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

  if (!classified.length && arr.length > 0) {
    classified = [[...arr]];
  }

  // console.log("class", classified);

  return classified;
};

const List = () => {
  const [pendingOrders, setPendingOrders] = useState<OrderModel[][]>([]);
  const [deliveredOrders, setDeliverdOrders] = useState<OrderModel[][]>([]);
  const [failedOrders, setFailedOrders] = useState<OrderModel[][]>([]);

  const { data: pending, isLoading, refetch: refetchPen } = useQuery(
    "Get orders",
    getOrders
  );

  const {
    data: delivered,
    isLoading: isLoadingDel,
    refetch: refetchDel,
  } = useQuery("Get delivered", getDeliveredOrders);
  const {
    data: failed,
    isLoading: loadingFailed,
    refetch: refetchFailed,
  } = useQuery("Get failed", getFailedOrders);
  const [tab, setTab] = useState<Tabs>(Tabs.pending);

  useEffect(() => {
    if (pending?.orders) {
      // console.log(pending);
      setPendingOrders(
        classifyArray(
          pending.orders.sort((a, b) => moment(b.date).diff(moment(a.date)))
        )
      );
    }
  }, [pending]);

  useEffect(() => {
    if (delivered?.orders) {
      setDeliverdOrders(
        classifyArray(
          delivered.orders.sort((a, b) => moment(b.date).diff(moment(a.date)))
        )
      );
    }
  }, [delivered]);

  useEffect(() => {
    if (failed?.orders) {
      setFailedOrders(
        classifyArray(
          failed.orders.sort((a, b) => moment(b.date).diff(moment(a.date)))
        )
      );
    }
  }, [failed]);

  return (
    <>
      {(isLoading || loadingFailed || isLoadingDel) && <Loading />}

      {pendingOrders?.length === 0 && <h6>No orders currently</h6>}

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            style={{
              fontSize: `24px`,
              fontWeight: 200,
            }}
          >
            Orders
          </div>
          <div className="tabs">
            <div
              onClick={() => setTab(Tabs.pending)}
              className={`tab ${tab === Tabs.pending ? `active` : ""}`}
            >
              Pending
            </div>
            <div
              onClick={() => setTab(Tabs.delivered)}
              className={`tab ${tab === Tabs.delivered ? `active` : ""}`}
            >
              Delivered
            </div>
            <div
              onClick={() => setTab(Tabs.failed)}
              className={`tab ${tab === Tabs.failed ? `active` : ""}`}
            >
              Failed
            </div>
          </div>
        </div>
        <div>
          <div>
            {tab === Tabs.pending && (
              <>
                {pendingOrders.length > 0 && (
                  <div>
                    {pendingOrders.map((orders, i) => {
                      return (
                        <div key={i} className="orders-collection">
                          <h3 style={{ marginBottom: "16px" }}>
                            {moment(orders[0].date).format("LL")}
                          </h3>
                          <ul className="dash-orders">
                            {orders &&
                              orders.length > 0 &&
                              orders.map((order) => {
                                return (
                                  <li key={order._id} className="dash-order">
                                    <DOrder
                                      refetch={refetchPen}
                                      order={order}
                                    />
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div>
            {tab === Tabs.delivered && (
              <>
                {deliveredOrders.length > 0 && (
                  <div>
                    {deliveredOrders.map((orders, i) => {
                      return (
                        <div key={i} className="orders-collection">
                          <h3 style={{ marginBottom: "16px" }}>
                            {moment(orders[0].date).format("LL")}
                          </h3>
                          <ul className="dash-orders">
                            {orders &&
                              orders.length > 0 &&
                              orders.map((order) => {
                                return (
                                  <li key={order._id} className="dash-order">
                                    <DOrder
                                      refetch={refetchDel}
                                      order={order}
                                    />
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
          <div>
            {tab === Tabs.failed && (
              <>
                {failedOrders.length > 0 && (
                  <div>
                    {failedOrders.map((orders, i) => {
                      return (
                        <div key={i} className="orders-collection">
                          <h3 style={{ marginBottom: "16px" }}>
                            {moment(orders[0].date).format("LL")}
                          </h3>
                          <ul className="dash-orders">
                            {orders &&
                              orders.length > 0 &&
                              orders.map((order) => {
                                return (
                                  <li key={order._id} className="dash-order">
                                    <DOrder
                                      refetch={refetchFailed}
                                      order={order}
                                    />
                                  </li>
                                );
                              })}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
