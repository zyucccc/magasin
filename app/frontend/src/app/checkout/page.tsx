'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import {CartItem , OrderSummary} from "@/app/interfaces/interfaces";

export default function CheckoutPage() {
    const [step, setStep] = useState(1); // 1: address, 2: delivery, 3: payment
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        province: '',
        postalCode: '',
        phone: '',
        country: 'Canada',
        shippingMethod: 'standard',
        paymentMethod: 'credit',
        cardNumber: '',
        expirationDate: '',
        securityCode: '',
        nameOnCard: '',
        sameAsBilling: true,
        receiveNews: false
    });

    // const [orderSummary, setOrderSummary] = useState({
    //     items: [],
    //     subtotal: 0,
    //     shipping: 25.00,
    //     tax: 0,
    //     total: 0
    // });
    const [orderSummary, setOrderSummary] = useState<OrderSummary>({
        items: [],
        subtotal: 0,
        shipping: 25.00,
        tax: 0,
        total: 0
    });

    // load cart from localStorage
    useEffect(() => {
        const loadCartFromStorage = () => {
            try {
                const savedCart = localStorage.getItem('cart');
                if (savedCart) {
                    const cartItems = JSON.parse(savedCart);

                    // somme des articles
                    const subtotal = cartItems.reduce((sum:number, item:CartItem) =>
                        sum + (item.product.price * item.quantity), 0);

                    // taxes
                    const tax = subtotal * 0.05;

                    // somme total
                    const shipping = 25.00; // 默认运费
                    const total = subtotal + tax + (step >= 2 && formData.shippingMethod === 'standard' ? 0 : shipping);

                    setOrderSummary({
                        items: cartItems,
                        subtotal,
                        shipping,
                        tax,
                        total
                    });
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            }
        };

        loadCartFromStorage();
    }, [step, formData.shippingMethod]);

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const handleChange = (e:any) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
            window.scrollTo(0, 0);
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // handle form submission
        alert('Commande commited！');
        // vide cart
        localStorage.removeItem('cart');
    };

    const renderStepIndicator = () => (
        <div className="flex items-center text-sm text-black mb-8">
            <Link href="/cart" className="hover:text-gray-700">Cart</Link>
            <span className="mx-2">›</span>
            <span className={step >= 1 ? "font-medium text-black" : "text-black"}>Information</span>
            <span className="mx-2">›</span>
            <span className={step >= 2 ? "font-medium text-black" : "text-black"}>Shipping</span>
            <span className="mx-2">›</span>
            <span className={step >= 3 ? "font-medium text-black" : "text-black"}>Payment</span>
        </div>
    );

    const renderOrderSummary = () => (
        <div className="bg-gray-50 p-6 rounded-md">
            <div className="flex justify-between items-center">
                <div className="text-xl font-semibold text-black mb-6">
                    <Link href="/" className="block mb-4">
                        <div className="text-2xl font-serif">MaiMai Christaux</div>
                        <div className="text-xs uppercase tracking-wide">GemStudio</div>
                    </Link>
                </div>
            </div>

            {orderSummary.items.map((item, index) => (
                <div key={index} className="flex items-center py-4 border-t border-gray-200">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-md overflow-hidden mr-4">
                        <div className="absolute top-0 right-0 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                            {item.quantity}
                        </div>
                        {item.product.imageSrc ? (
                            <Image
                                src={item.product.imageSrc}
                                alt={item.product.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-12 h-12 rounded-full bg-purple-200"></div>
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="text-sm font-medium text-black">{item.product.name}</div>
                        <div className="text-xs text-black">Size: {item.size}</div>
                    </div>
                    <div className="text-sm font-medium text-black">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
            ))}

            {orderSummary.items.length === 0 && (
                <div className="py-4 text-center text-black">
                    Your cart is empty.
                </div>
            )}

            <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between py-1">
                    <span className="text-black">Subtotal</span>
                    <span className="text-black">${orderSummary.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-black">Shipping</span>
                    {step >= 2 && formData.shippingMethod === 'standard' ? (
                        <div className="flex flex-col items-end">
                            <span className="line-through text-gray-500">${orderSummary.shipping.toFixed(2)}</span>
                            <span className="font-medium text-black">FREE</span>
                            <span className="text-xs text-green-600">FREE SHIPPING</span>
                        </div>
                    ) : (
                        <span className="text-black">Calculated at next step</span>
                    )}
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-black">Estimated taxes</span>
                    <span className="text-black">${orderSummary.tax.toFixed(2)}</span>
                </div>
            </div>

            <div className="py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-black">Total</span>
                    <div className="text-right">
                        <span className="text-sm text-gray-700 mr-1">CAD</span>
                        <span className="text-xl font-bold text-black">${orderSummary.total.toFixed(2)}</span>
                    </div>
                </div>
                {step >= 2 && formData.shippingMethod === 'standard' && (
                    <div className="mt-2 text-sm text-green-600 flex items-center justify-end">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        TOTAL SAVINGS ${orderSummary.shipping.toFixed(2)}
                    </div>
                )}
            </div>

            {/*discount code*/}
            {/*<div className="mt-4">*/}
            {/*    <div className="relative">*/}
            {/*        <input*/}
            {/*            type="text"*/}
            {/*            placeholder="Discount code"*/}
            {/*            className="w-4/5 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"*/}
            {/*        />*/}
            {/*        <button className="absolute right-0 top-0 bottom-0 bg-gray-100 px-4 rounded-r-md text-black hover:bg-gray-200 transition-colors">*/}
            {/*            Apply*/}
            {/*        </button>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );

    // address form
    const renderAddressForm = () => (
        <div>
            <h2 className="text-xl font-bold mb-6 text-black">Contact</h2>
            <div className="mb-4">
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
            </div>

            <div className="flex items-center mb-6">
                <input
                    type="checkbox"
                    id="receiveNews"
                    name="receiveNews"
                    checked={formData.receiveNews}
                    onChange={handleChange}
                    className="h-4 w-4 text-black focus:ring-gray-500"
                />
                <label htmlFor="receiveNews" className="ml-2 text-sm text-black">
                    Email me with news and offers
                </label>
            </div>

            <h2 className="text-xl font-bold mb-6 text-black">Shipping address</h2>
            <div className="mb-4">
                <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none text-black"
                    required
                >
                    <option value="Canada">Canada</option>
                    <option value="United States">United States</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First name"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last name"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
            </div>

            <div className="mb-4">
                <input
                    type="text"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    placeholder="Apartment, suite, etc. (optional)"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
                <select
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 appearance-none text-black"
                    required
                >
                    <option value="">Province</option>
                    <option value="ON">Ontario</option>
                    <option value="QC">Quebec</option>
                    <option value="BC">British Columbia</option>
                    <option value="AB">Alberta</option>
                </select>
                <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="Postal code"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
            </div>

            <div className="mb-6">
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                    required
                />
            </div>

            <div className="flex justify-between mt-8">
                {/*<Link href="/cart" className="flex items-center text-sm text-black hover:text-gray-700">*/}
                {/*    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">*/}
                {/*        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />*/}
                {/*    </svg>*/}
                {/*    Return to cart*/}
                {/*</Link>*/}
                <button
                    onClick={handleContinue}
                    className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Continue to shipping
                </button>
            </div>
        </div>
    );

    // 渲染邮递方式表单
    const renderShippingMethodForm = () => (
        <div>
            <div className="border rounded-md p-4 mb-6">
                <div className="flex justify-between mb-2">
                    <div className="text-sm text-black">
                        <div>Contact</div>
                        <div className="font-medium">{formData.email}</div>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Change
                    </button>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                    <div className="text-sm text-black">
                        <div>Ship to</div>
                        <div className="font-medium">
                            {formData.address}, {formData.city}, {formData.province} {formData.postalCode}, {formData.country}
                        </div>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Change
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-6 text-black">Shipping method</h2>

            <div className="mb-6">
                <label className="block border rounded-md mb-2 relative cursor-pointer">
                    <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                    />
                    <div className="p-4 pl-10 flex justify-between">
                        <span className="text-black">Standard (5 - 9 business days)</span>
                        <div>
                            <span className="line-through text-gray-500 mr-2">${orderSummary.shipping.toFixed(2)}</span>
                            <span className="font-medium text-black">FREE</span>
                        </div>
                    </div>
                </label>

                <label className="block border rounded-md relative cursor-pointer">
                    <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                    />
                    <div className="p-4 pl-10 flex justify-between">
                        <span className="text-black">Express (3 - 7 business days)</span>
                        <span className="text-black">$35.00</span>
                    </div>
                </label>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    className="flex items-center text-sm text-black hover:text-gray-700"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Return to information
                </button>
                <button
                    onClick={handleContinue}
                    className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Continue to payment
                </button>
            </div>
        </div>
    );

    // 渲染支付表单
    const renderPaymentForm = () => (
        <div>
            <div className="border rounded-md p-4 mb-6">
                <div className="flex justify-between mb-2">
                    <div className="text-sm text-black">
                        <div>Contact</div>
                        <div className="font-medium">{formData.email}</div>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Change
                    </button>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200 mb-2">
                    <div className="text-sm text-black">
                        <div>Ship to</div>
                        <div className="font-medium">
                            {formData.address}, {formData.city}, {formData.province} {formData.postalCode}, {formData.country}
                        </div>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Change
                    </button>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-200">
                    <div className="text-sm text-black">
                        <div>Shipping method</div>
                        <div className="font-medium">
                            {formData.shippingMethod === 'standard'
                                ? 'Standard (5 - 9 business days) · FREE'
                                : 'Express (3 - 7 business days) · $35.00'}
                        </div>
                    </div>
                    <button
                        onClick={() => setStep(2)}
                        className="text-sm text-black hover:text-gray-700"
                    >
                        Change
                    </button>
                </div>
            </div>

            <h2 className="text-xl font-bold mb-2 text-black">Payment</h2>
            <p className="text-sm text-black mb-6">All transactions are secure and encrypted.</p>

            <div className="mb-6">
                <div className="border rounded-md overflow-hidden">
                    <label className="block relative cursor-pointer border-b">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="credit"
                            checked={formData.paymentMethod === 'credit'}
                            onChange={handleChange}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                        />
                        <div className="p-4 pl-10 flex justify-between items-center">
                            <span className="text-black">Credit card</span>
                            <div className="flex space-x-2">
                                <div className="w-8 h-5 bg-blue-100 rounded flex items-center justify-center text-xs text-blue-800">VISA</div>
                                <div className="w-8 h-5 bg-red-100 rounded flex items-center justify-center text-xs text-red-800">MC</div>
                                <div className="w-8 h-5 bg-blue-200 rounded flex items-center justify-center text-xs text-blue-800">AMEX</div>
                                <div className="w-8 h-5 bg-orange-100 rounded flex items-center justify-center text-xs text-orange-800">DISC</div>
                            </div>
                        </div>
                    </label>

                    {formData.paymentMethod === 'credit' && (
                        <div className="p-4 bg-gray-50">
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    value={formData.cardNumber}
                                    onChange={handleChange}
                                    placeholder="Card number"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    name="expirationDate"
                                    value={formData.expirationDate}
                                    onChange={handleChange}
                                    placeholder="Expiration date (MM / YY)"
                                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                                    required
                                />
                                <input
                                    type="text"
                                    name="securityCode"
                                    value={formData.securityCode}
                                    onChange={handleChange}
                                    placeholder="Security code"
                                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                                    required
                                />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="nameOnCard"
                                    value={formData.nameOnCard}
                                    onChange={handleChange}
                                    placeholder="Name on card"
                                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500 text-black"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <label className="block relative cursor-pointer">
                        <input
                            type="radio"
                            name="paymentMethod"
                            value="paypal"
                            checked={formData.paymentMethod === 'paypal'}
                            onChange={handleChange}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                        />
                        <div className="p-4 pl-10 flex justify-between items-center">
                            <span className="text-black">PayPal</span>
                            <div className="w-16 h-5 flex items-center">
                                <div className="text-blue-800 font-bold">Pay</div>
                                <div className="text-blue-500 font-bold">Pal</div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium mb-2 text-black">Billing address</h3>
                <p className="text-sm text-black mb-4">Select the address that matches your card or payment method.</p>

                <div className="mb-3">
                    <label className="block border rounded-md relative cursor-pointer p-4 pl-10">
                        <input
                            type="radio"
                            name="sameAsBilling"
                            checked={formData.sameAsBilling}
                            onChange={() => setFormData({...formData, sameAsBilling: true})}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                        />
                        <span className="text-black">Same as shipping address</span>
                    </label>
                </div>

                <div>
                    <label className="block border rounded-md relative cursor-pointer p-4 pl-10">
                        <input
                            type="radio"
                            name="sameAsBilling"
                            checked={!formData.sameAsBilling}
                            onChange={() => setFormData({...formData, sameAsBilling: false})}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 h-4 w-4 text-black focus:ring-gray-500"
                        />
                        <span className="text-black">Use a different billing address</span>
                    </label>
                </div>
            </div>

            <div className="flex justify-between mt-8">
                <button
                    onClick={handleBack}
                    className="flex items-center text-sm text-black hover:text-gray-700"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Return to shipping
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
                >
                    Pay now
                </button>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-10 pt-20">
                    <div className="max-w-6xl mx-auto">
                        {renderStepIndicator()}

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                            <div className="md:col-span-3">
                                {step === 1 && renderAddressForm()}
                                {step === 2 && renderShippingMethodForm()}
                                {step === 3 && renderPaymentForm()}
                            </div>

                            <div className="md:col-span-2">
                                {renderOrderSummary()}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
        </div>
    );
}