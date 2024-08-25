import React, { useEffect, useState } from "react";
import axios from "axios";
import CardStats from "../Cards/CardStats.js";

export default function HeaderStats() {
  const [productCount, setProductCount] = useState("Loading...");
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.get("http://localhost:5066/api/Products/count", {
          headers: {
            'Authorization': `Bearer ${token}`, 
          },
        });
        setProductCount(response.data); 
      } catch (error) {
        console.error("Error fetching product count:", error);
        setProductCount("Error");
      }
    };

    fetchProductCount();
  }, [token]); 

  return (
    <>
      {/* Header */}
      <div className="relative bg-lightBlue-600 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Orders"
                  statTitle={productCount}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="Products"
                  statTitle={productCount}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES"
                  statTitle={productCount}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
