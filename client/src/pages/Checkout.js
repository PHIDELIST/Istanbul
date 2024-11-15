import React from "react";
import { useCartContext } from "../components/CartContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { backendUrl } from "../utils";

const Checkout = () => {
    const { cartItems } = useCartContext();
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const getAuthToken = () => localStorage.getItem("token");

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

    const initiateMpesaTransaction = async () => {
        try {
            setLoading(true);
            const totalAmount = calculateTotal();
            const phoneNumber = prompt("Enter your MPesa phone number:");

            if (!phoneNumber) {
                alert("Phone number is required for payment.");
                return;
            }
            const token = localStorage.getItem("token");
            const reference = `Order-${Date.now()}`; // Unique order reference
            const payload =  {
                phoneNumber,
                amount: totalAmount,
                reference,
            }
            // Call the API to initiate the MPesa transaction
            const response = await axios.post(
                `${backendUrl}/api/Mpesa/initiate`,payload,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            console.log(response);
            alert(response.data || "Transaction initiated. Check your phone.");
        } catch (error) {
            setError("Failed to initiate MPesa payment.");
            console.error("Error:", error);
        } finally {
            setLoading(false);
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

            {/* MPesa Payment Button */}
            <button
                onClick={initiateMpesaTransaction}
                disabled={loading}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
                {loading ? "Processing..." : "Pay with MPesa"}
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};

export default Checkout;
