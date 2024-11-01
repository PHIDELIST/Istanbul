import React from "react";

// components

import CardLineChart from "../../Cards/CardLineChart.js";
import CardBarChart from "../../Cards/CardBarChart.js";
// import CardPageVisits from "../../Cards/CardPageVisits.js";
// import CardOrders from "../../Cards/CardOrders.js";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          {/* <CardPageVisits /> */}
        </div>
        <div className="w-full xl:w-4/12 px-4">
          {/* <CardOders /> */}
        </div>
      </div>
    </>
  );
}
