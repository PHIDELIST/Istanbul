import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { backendUrl } from '../../utils';

export default function CardOrderTable({ color }) {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/Order/all-orders`, {
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

  const markAsDelivered = async (orderId) => {
    try {
      await axios.post(`${backendUrl}/api/Order/${orderId}/deliver`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, isDelivered: true } : order
        )
      );
    } catch (error) {
      console.error("Error marking order as delivered:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Order Table */}
      <div className="flex-1 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Order Date</th>
              <th scope="col" className="px-6 py-3">Buyer</th>
              <th scope="col" className="px-6 py-3">Products</th>
              <th scope="col" className="px-6 py-3">Total Price</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">
                  {new Date(order.orderDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">{order.userFirstName}</td>
                <td className="px-6 py-4">
                  {order.products.map((product) => (
                    <div key={product.orderProductId} className="flex flex-col">
                      <span>Product: {product.productName}</span>
                      <span>Quantity: {product.quantity}</span>
                      <span>Price: ${product.price}</span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4">
                  ${order.products.reduce((total, product) => total + (product.price * product.quantity), 0)}
                </td>
                <td className="px-6 py-4">
                  {order.delivered ? "Delivered" : "Pending"}
                </td>
                <td className="px-6 py-4">
                  {!order.delivered && (
                    <button
                      onClick={() => markAsDelivered(order.orderId)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Mark as Delivered
                    </button>
                  )}
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
