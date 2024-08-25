import React from "react";

// components

import CardProductTable from "../../Cards/CardProductTable.js";
export default function ProductsTables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardProductTable />
        </div>
      </div>
    </>
  );
}
