import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../utils";

export default function Products() {
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token"); 

    useEffect(() => {
        axios.get(`${backendUrl}/api/Products`)
            .then(response => {
                const data = response.data.products; 
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Expected an array but received:", data);
                    setProducts([]);
                }
            })
            .catch(error => {
                console.error("Error fetching the products:", error);
                setProducts([]); 
            });
    }, []);


    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Wall Art Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <Link
                            key={product.id}
                            to={`/viewproduct/${product.id}`} 
                            state={{ product }}
                            className="group"
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                    src={`${backendUrl}/${product.imageSrc}`} 
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {product.categoryName}
                            </p>
                            <h3 className="mt-4 text-sm text-gray-700">
                                ${product.price}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
