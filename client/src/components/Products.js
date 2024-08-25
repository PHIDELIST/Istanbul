import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Import the images directly
import image1 from "../assets/img/image1.jpg";
import image2 from "../assets/img/image2.jpg";
import image3 from "../assets/img/image3.jpg";
import image4 from "../assets/img/image4.jpg";
import image5 from "../assets/img/image5.jpg";
import image6 from "../assets/img/image6.jpg";
import image7 from "../assets/img/image7.jpg";
import image8 from "../assets/img/image8.jpg";
import image9 from "../assets/img/image9.jpg";

export default function Products() {
    const [products, setProducts] = useState([]);
    const token = Boolean(localStorage.getItem("token")); 
    useEffect(() => {
        axios.get("http://localhost:5055/api/Products", {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
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

    console.log(products);

    // Create a map for image sources
    const imageMap = {
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        image7,
        image8,
        image9,
    };

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
                                    src={imageMap[product.imageSrc] || image1}
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
