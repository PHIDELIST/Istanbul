import { backendUrl } from '../utils';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { useCartContext } from "../components/CartContext";

export default function ViewProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { addToCart } = useCartContext();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`${backendUrl}/api/Products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setError(error.message || "Error fetching product");
            }
        }

        fetchProduct();
    }, [id]);

    if (error) {
        return <p className="text-center text-red-600">{error}</p>;
    }

    if (!product) {
        return <p className="text-center">Loading...</p>;
    }

    // Adjust price to have two decimal places
    const formattedPrice = `$${product.price.toFixed(2)}`;

    return (
        <div className="bg-white py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                    <img
                         src={`${backendUrl}/${product.imageSrc}`} 
                        alt={product.imageAlt}
                        className="rounded-lg shadow-md w-full lg:w-auto h-auto"
                    />
                </div>
                <div className="mt-4 lg:mt-0 lg:col-span-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {product.name}
                    </h1>
                    <p className="mt-4 text-gray-900">
                        {product.imageAlt} {product.description}
                    </p>

                    <div className="mt-6">
                        {/* Fixed 5-star rating */}
                        <div className="flex items-center">
                            {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                    key={rating}
                                    className="text-blue-500 h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Rated 5 stars by World Class Wall Art Raters
                        </p>
                    </div>

                    <p className="mt-1 text-lg font-medium text-gray-900">
                        {formattedPrice}
                    </p>
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-10 w-full lg:w-auto flex items-center justify-center rounded-md border border-transparent bg-slate-600 px-8 py-3 text-base font-medium text-white hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
