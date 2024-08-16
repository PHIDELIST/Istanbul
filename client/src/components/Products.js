import React, { useState } from "react";
import { Link } from "react-router-dom";

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
    const [products] = useState([
        {
            name: "Majestic Mountain",
            imageSrc: image1,
            imageAlt: "A breathtaking wall art piece of a majestic mountain landscape.",
            category_name: "Nature",
        },
        {
            name: "Serene Sunset",
            imageSrc: image2,
            imageAlt: "A vibrant wall art piece capturing the serenity of a sunset over the ocean.",
            category_name: "Sunset",
        },
        {
            name: "Forest Whisper",
            imageSrc: image3,
            imageAlt: "A calming wall art piece that depicts the tranquil essence of a deep forest.",
            category_name: "Nature",
        },
        {
            name: "Urban Dreams",
            imageSrc: image4,
            imageAlt: "An abstract wall art piece representing the hustle and dreams of urban life.",
            category_name: "Abstract",
        },
        {
            name: "Golden Horizon",
            imageSrc: image5,
            imageAlt: "A captivating wall art piece showcasing the golden hues of the horizon at dawn.",
            category_name: "Sunset",
        },
        {
            name: "Mystic River",
            imageSrc: image6,
            imageAlt: "An ethereal wall art piece that portrays the mystique of a flowing river at twilight.",
            category_name: "Nature",
        },
        {
            name: "Cosmic Journey",
            imageSrc: image7,
            imageAlt: "A stunning wall art piece illustrating the vastness and beauty of the cosmos.",
            category_name: ["Abstract", "Space"],
        },
        {
            name: "City Lights",
            imageSrc: image8,
            imageAlt: "A dynamic wall art piece capturing the vibrant energy of city lights at night.",
            category_name: ["Urban", "Nightlife"],
        },
        {
            name: "Floral Symphony",
            imageSrc: image9,
            imageAlt: "A delicate wall art piece that celebrates the beauty and harmony of blooming flowers.",
            category_name: ["Nature", "Floral"],
        },
    ]);

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Wall Art Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product, index) => (
                        <Link
                            key={index}
                            to={`/viewproduct/${index}`} // Make sure this matches your route in React Router
                            state={{ product }} // Pass product data as state
                            className="group"
                        >
                            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                <img
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                            </div>
                            <h3 className="mt-4 text-sm text-gray-700">
                                {product.name}
                            </h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">
                                {Array.isArray(product.category_name)
                                    ? product.category_name.join(", ")
                                    : product.category_name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
