import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getOrders } from "../../data/order.data";
import { OrderModel } from "../../models/order.model";
import Loading from "../layout/Loading";

const Summary = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const { data, isLoading } = useQuery("Get orders", getOrders);

  useEffect(() => {
    if (data?.orders) {
      setOrders(
        // @ts-ignore
        data.orders
      );
    }
  }, [data]);

  return (
    <div className="overview">
      {isLoading && <Loading />}
      <div
        style={{
          background: "linear-gradient(135deg, #3498db, #97d6ff)",
        }}
        className="stat"
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 300,
            }}
          >
            Total
          </div>
          <div>Orders</div>
        </div>
        <div>
          <div style={{ fontSize: "24px" }}>{orders.length}</div>
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(135deg, #97d6ff, #e050b5)",
        }}
        className="stat"
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 300,
            }}
          >
            Pending
          </div>
          <div>Orders</div>
        </div>
        <div>
          <div style={{ fontSize: "24px" }}>
            {Math.floor(Math.random() * 10)}
          </div>
        </div>
      </div>
      <div
        style={{
          background: "linear-gradient(135deg, #31e07a, #ec8c5a)",
        }}
        className="stat"
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 300,
            }}
          >
            Successful
          </div>
          <div>Deliveries</div>
        </div>
        <div>
          <div style={{ fontSize: "24px" }}>
            {Math.floor(Math.random() * 5)}
          </div>
        </div>
      </div>
      <div
        // style={{
        //   background: "linear-gradient(135deg, #, #)",
        // }}
        className="stat"
      >
        <div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 300,
            }}
          >
            Unsuccessful
          </div>
          <div>Deliveries</div>
        </div>
        <div>
          <div style={{ fontSize: "24px" }}>
            {Math.floor(Math.random() * 10)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
