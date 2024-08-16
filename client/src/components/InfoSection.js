import React from "react";

function InfoSection() {
    return (
        <div className="bg-gray-200 py-16">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Column 1 */}
                    <div className="col-span-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                            Discover Timeless Artistry
                        </h2>
                        <p className="text-base text-gray-600 leading-6 text-center">
                            Wall Art Istanbul offers you a curated collection of 
                            art that blends the richness of Turkish culture with 
                            modern design. Each piece is a celebration of artistic 
                            excellence, crafted to transform your living space 
                            into a haven of creativity.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="col-span-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                            Masterful Creations
                        </h2>
                        <p className="text-base text-gray-600 leading-6 text-center">
                            Our artworks are created by skilled artisans who draw 
                            inspiration from centuries-old traditions. Wall Art 
                            Istanbul is not just about decoration; it’s about 
                            bringing history and craftsmanship into your home.
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div className="col-span-1">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                            Sustainable Elegance
                        </h2>
                        <p className="text-base text-gray-600 leading-6 text-center">
                            We are dedicated to sustainability. Wall Art Istanbul 
                            adopts eco-friendly practices in sourcing and production, 
                            ensuring that each piece not only enhances your space 
                            but also reflects a commitment to the environment.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;
