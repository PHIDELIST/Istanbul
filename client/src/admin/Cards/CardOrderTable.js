import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export default function CardOrderTable({ color }) {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5066/api/Order/all-orders", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Order Table */}
      <div className="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order ID</th>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">User ID</th>
              <th scope="col" className="px-6 py-3">Products</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap dark:text-gray-300">
                  {order.orderId}
                </th>
                <td className="px-6 py-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{order.userId}</td>
                <td className="px-6 py-4">
                  {order.products.map((product) => (
                    <div key={product.orderProductId} className="flex flex-col">
                      <span>Product ID: {product.productId}</span>
                      <span>Quantity: {product.quantity}</span>
                      <span>Price: ${product.price}</span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  ${order.products.reduce((total, product) => total + (product.price * product.quantity), 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

CardOrderTable.propTypes = {
  color: PropTypes.string
};
