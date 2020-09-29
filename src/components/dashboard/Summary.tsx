import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";

const Summary = () => {
  const { pendingOrders, summary } = useSelector((state: RootReducer) => ({
    summary: state.orders.summary,
    pendingOrders: state.orders?.orders?.length,
  }));
  // eslint-disable
  const {
    // @ts-ignore
    totalOrders,
    // @ts-ignore
    successfulDeliveries,
    // @ts-ignore
    unsuccessfulDeliveries,
    // @ts-ignore
    // deliveries,
    // @ts-ignore
    totalSales,
  } = summary;

  return (
    <Fragment>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Summary</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Total Orders</td>
            <td>{totalOrders}</td>
          </tr>
          <tr>
            <td>Successful Deliveries</td>
            <td>{successfulDeliveries}</td>
          </tr>
          <tr>
            <td>Unsuccessful Deliveries</td>
            <td>{unsuccessfulDeliveries}</td>
          </tr>
          <tr>
            <td>Pending Orders</td>
            <td>{pendingOrders}</td>
          </tr>
          <tr>
            <td> Total Sales</td>
            <td>{totalSales}</td>
          </tr>
        </tbody>
      </table>
    </Fragment>
  );
};

export default Summary;
