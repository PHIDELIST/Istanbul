import React from "react";
import { useCartContext } from "../components/CartContext";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const Checkout = () => {
    const { cartItems } = useCartContext();
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = React.useState(options.currency || "USD");
    const [error, setError] = React.useState(null);

    const getAuthToken = () => {
        return localStorage.getItem("token"); 
    };

    const getUserIdFromToken = () => {
        const token = getAuthToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                return decodedToken.Id; 
            } catch (e) {
                console.error("Error decoding token:", e);
                return null;
            }
        }
        return null;
    };

    const calculateTotal = () => {
        return cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    };

    const createOrderInBackend = async (orderData) => {
        try {
            const authToken = getAuthToken();
            const response = await axios.post(
                "http://localhost:5066/api/Order",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            setError("Failed to create order.");
            console.error("Error creating order:", error);
            throw error;
        }
    };

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: calculateTotal(),
                    },
                },
            ],
        });
    };

    const onApproveOrder = async (data, actions) => {
        try {
            const details = await actions.order.capture();
            const name = details.payer.name.given_name;
            alert(`Transaction completed by ${name}`);

            const userId = getUserIdFromToken();
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const orderData = {
                orderDate: new Date().toISOString(),
                userId: userId,
                products: cartItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
            };

            await createOrderInBackend(orderData);
            alert("Order placed successfully.");
        } catch (error) {
            setError("Failed to process payment.");
            console.error("Error approving order:", error);
            alert("Failed to process payment.");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Checkout</h1>

            {/* Cart Items */}
            <div className="mb-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex justify-between items-center bg-white p-4 rounded-md mb-2 shadow"
                    >
                        <div className="flex items-center">
                            <img
                                className="w-16 h-16 object-cover rounded mr-4"
                                src={`/../../assets/${item.image_url}`}
                                alt={item.name}
                            />
                            <div>
                                <h5 className="font-bold">{item.name}</h5>
                                <p className="text-sm text-gray-500">
                                    Quantity: {item.quantity}
                                </p>
                            </div>
                        </div>
                        <span className="font-semibold">
                            ${(item.price * item.quantity).toFixed(2)}
                        </span>
                    </div>
                ))}
                <p className="text-xl font-bold">Total: ${calculateTotal()}</p>
            </div>

            {/* Currency Selection */}
            <div className="mb-4">
                <select value={currency} onChange={onCurrencyChange} className="p-2 border rounded">
                    <option value="USD">💵 USD</option>
                    <option value="EUR">💶 Euro</option>
                </select>
            </div>

            {/* Payment Buttons */}
            <div className="paypal">
                {isPending ? (
                    <p>LOADING...</p>
                ) : (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
                )}
            </div>
        </div>
    );
};

export default Checkout;
