import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartWrapper = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const removeFromCart = (productId) => {
        setCartItems((currentItems) => {
            console.log(`Removing item with id: ${productId}`);
            return currentItems.filter((item) => item.id !== productId);
        });
    };

    const updateQuantity = (productId, newQuantity) => {
        setCartItems((currentItems) => {
            console.log(`Updating item with id: ${productId}, new quantity: ${newQuantity}`);
            return currentItems.map((item) => {
                if (item.id === productId) {
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
        });
    };

    const addToCart = (product) => {
        setCartItems((currentItems) => {
            const isProductInCart = currentItems.some(
                (item) => item.id === product.id
            );

            if (isProductInCart) {
                console.log(`Product ${product.id} already in cart, incrementing quantity`);
                return currentItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                console.log(`Adding new product ${product.id} to cart`);
                return [...currentItems, { ...product, quantity: 1 }];
            }
        });
    };

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
