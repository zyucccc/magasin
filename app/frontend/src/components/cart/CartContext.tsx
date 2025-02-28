'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/app/interfaces/interfaces';
import {CartItem,CartContextType} from "@/app/interfaces/interfaces";

// cree le context
const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [subtotal, setSubtotal] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [freeShippingQualified, setFreeShippingQualified] = useState(false);
    const freeShippingThreshold = 160;

    // load cart from localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        console.log('load cart from localStorage:', savedCart);
        if (savedCart && savedCart !== '[]') {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }, []);

    // calculate subtotal and item count
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        setSubtotal(total);
        setItemCount(count);
        setFreeShippingQualified(total >= freeShippingThreshold);

        // save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
        // console.log('update to localStorage:', JSON.stringify(cartItems));
    }, [cartItems, freeShippingThreshold]);

    // add product to cart
    const addToCart = (product: Product, quantity: number, size: string) => {
        setCartItems(prevItems => {
            // check if the product already exists in the cart
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id && item.size === size
            );

            if (existingItemIndex !== -1) {
                // if the product already exists in the cart, update the quantity
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                return [...prevItems, { product, quantity, size }];
            }
        });

        // after adding product to cart, open cart
        setIsCartOpen(true);
    };

    // remove product from cart
    const removeFromCart = (index: number) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    // update product quantity
    const updateQuantity = (index: number, quantity: number) => {
        if (quantity < 1) return;

        setCartItems(prevItems => {
            const updatedItems = [...prevItems];
            updatedItems[index].quantity = quantity;
            return updatedItems;
        });
    };

    // 打开购物车
    const openCart = () => {
        console.log("openCart");
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    // clear Cart
    const clearCart = () => {
        setCartItems([]);
    };

    const value = {
        cartItems,
        isCartOpen,
        subtotal,
        itemCount,
        freeShippingQualified,
        freeShippingThreshold,
        addToCart,
        removeFromCart,
        updateQuantity,
        openCart,
        closeCart,
        clearCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;