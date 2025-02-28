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
    const freeShippingThreshold = 160; // 免运费阈值

    // 从localStorage加载购物车
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                setCartItems(parsedCart);
            } catch (error) {
                console.error('Error parsing cart from localStorage:', error);
            }
        }
    }, []);

    // 计算小计和商品数量
    useEffect(() => {
        const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        setSubtotal(total);
        setItemCount(count);
        setFreeShippingQualified(total >= freeShippingThreshold);

        // 保存到localStorage
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems, freeShippingThreshold]);

    // 添加商品到购物车
    const addToCart = (product: Product, quantity: number, size: string) => {
        setCartItems(prevItems => {
            // 检查是否已有相同商品和尺寸
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id && item.size === size
            );

            if (existingItemIndex !== -1) {
                // 如果已存在，更新数量
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // 如果不存在，添加新商品
                return [...prevItems, { product, quantity, size }];
            }
        });

        // 添加商品后自动打开购物车
        setIsCartOpen(true);
    };

    // 从购物车移除商品
    const removeFromCart = (index: number) => {
        setCartItems(prevItems => prevItems.filter((_, i) => i !== index));
    };

    // 更新商品数量
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

    // 关闭购物车
    const closeCart = () => {
        setIsCartOpen(false);
    };

    // 清空购物车
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