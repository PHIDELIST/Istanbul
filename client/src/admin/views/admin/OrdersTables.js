import React from "react";

import CardOrderTable from "../../Cards/CardOrderTable.js";
export default function OrdersTable() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardOrderTable />
        </div>
      </div>
    </>
  );
}
