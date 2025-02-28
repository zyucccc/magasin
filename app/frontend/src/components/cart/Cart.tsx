'use client';

import Link from 'next/link';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus } from 'lucide-react';
import { useCart } from "@/app/frontend/src/components/cart/CartContext";

const Cart = () => {
    // use cart hook
    const {
        isCartOpen,
        closeCart,
        cartItems,
        subtotal,
        freeShippingQualified,
        freeShippingThreshold,
        updateQuantity,
        removeFromCart
    } = useCart();

    //save the state of the gift expanded
    const [isGift, setIsGift] = useState(false);
    const [giftExpanded, setGiftExpanded] = useState(false);

    // if the cart is not open, return null
    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* backend */}
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeCart}></div>

            {/* side bar */}
            <div className="fixed right-0 top-0 h-full bg-white w-full md:w-96 shadow-lg transform transition-transform duration-300 ease-in-out">
                {/* promotion at top */}
                {/*<div className="bg-gray-800 text-white py-3 px-4">*/}
                {/*    <p className="text-center">Get Extra 15% Off Over $160!</p>*/}
                {/*</div>*/}

                {/* titre et close bouton */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200 text-black">
                    <h2 className="text-2xl font-medium">CART</h2>
                    <button onClick={closeCart} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>

                {/* tip for free ship */}
                <div className="p-4 border-b border-gray-200">
                    {freeShippingQualified ? (
                        <div className="text-gray-800">
                            <p>Congratulations! Your order qualifies for free shipping</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div className="bg-gray-800 h-2 rounded-full w-full"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-gray-800">
                            <p>Add ${(freeShippingThreshold - subtotal).toFixed(2)} more to qualify for FREE shipping</p>
                            <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                                <div
                                    className="bg-gray-800 h-2 rounded-full"
                                    style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    )}
                </div>

                {/* product list */}
                <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500">Your cart is empty</p>
                            <button
                                onClick={closeCart}
                                className="mt-4 bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-700"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <>
                            {cartItems.map((item, index) => (
                                <div key={`${item.product.id}-${item.size}`} className="flex py-4 border-b border-gray-200">
                                    {/* image */}
                                    <div className="w-24 h-24 relative bg-gray-100 mr-4">
                                        {item.product.imageSrc ? (
                                            <Image
                                                src={item.product.imageSrc}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <span className="text-center text-sm">{item.product.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* product info */}
                                    <div className="flex-1 ">
                                        <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                                        <p className="text-sm text-gray-500 mb-2">Size: {item.size}</p>

                                        <div className="flex justify-between items-center ">
                                            <div className="flex items-center border border-gray-300 rounded">
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity - 1)}
                                                    className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="px-3 text-black">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(index, item.quantity + 1)}
                                                    className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeFromCart(index)}
                                                className="text-gray-700 hover:text-gray-900 text-sm font-medium"
                                            >
                                                REMOVE
                                            </button>
                                        </div>
                                    </div>

                                    {/* prix */}
                                    <div className="ml-4 text-right">
                                        <div className="font-medium text-black">${item.product.price.toFixed(2)}</div>
                                        {item.product.originalPrice && (
                                            <div className="text-gray-500 line-through text-sm">
                                                ${item.product.originalPrice.toFixed(2)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* gift */}
                            <div className="py-4 border-b border-gray-200">
                                <button
                                    onClick={() => setGiftExpanded(!giftExpanded)}
                                    className="w-full flex justify-between items-center text-black"
                                >
                                    <span className="font-medium">Is this a gift?</span>
                                    <span className="text-2xl">{giftExpanded ? '−' : '+'}</span>
                                </button>

                                {giftExpanded && (
                                    <div className="mt-3">
                                        <label className="flex items-center text-black">
                                            <input
                                                type="checkbox"
                                                checked={isGift}
                                                onChange={() => setIsGift(!isGift)}
                                                className="mr-2 h-4 w-4"
                                            />
                                            <span>Add gift wrapping and a personalized message</span>
                                        </label>

                                        {isGift && (
                                            <textarea
                                                className="w-full mt-2 p-2 border border-gray-300 rounded"
                                                placeholder="Add your gift message here..."
                                                rows={3}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>

                {/* subtotal et pay */}
                {cartItems.length > 0 && (
                    <div className="border-t border-gray-200 p-4">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-black">SUBTOTAL</span>
                            <span className="text-2xl font-medium text-black">${subtotal.toFixed(2)} CAD</span>
                        </div>

                        <Link href="/frontend/src/app/checkout" className="block w-full bg-black text-white py-3 font-medium mb-3 text-center">
                            CHECK OUT
                        </Link>

                        {/*<button className="w-full border border-black py-3 font-medium text-black">*/}
                        {/*    VIEW CART*/}
                        {/*</button>*/}

                        <p className="text-sm text-gray-500 mt-4">
                            Shipping, taxes, and discount codes are calculated at checkout
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;