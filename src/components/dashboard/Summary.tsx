import React, { FC } from "react";
import { IStats } from "../../models/order.model";

const Summary: FC<{ stats: IStats }> = ({ stats }) => {
  return (
    <div className="overview">
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
          <div style={{ fontSize: "24px" }}>{stats.total}</div>
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
          <div style={{ fontSize: "24px" }}>{stats.pending}</div>
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
          <div style={{ fontSize: "24px" }}>{stats.delivered}</div>
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
          <div style={{ fontSize: "24px" }}>{stats.failed}</div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
