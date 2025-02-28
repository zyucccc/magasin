'use client';

import React, { useState } from 'react';
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Cart from '@/app/frontend/src/components/cart/Cart';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
        isUrgent: false,
        inquiryType: 'General Inquires'
    });

    const handleChange = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you for your message. We will get back to you soon!');
    };

    return (
        <div className="bg-white w-full min-h-screen">
                <Navbar />
                <Cart />

                <div className="text-center pt-20 pb-12">
                    <h1 className="text-3xl font-medium text-gray-900">Contact</h1>
                </div>

                {/* 联系表单 */}
                <div className="container mx-auto px-4 max-w-xl pb-20">
                    <form onSubmit={handleSubmit}>
                        {/* 全名 */}
                        <div className="mb-6">
                            <label htmlFor="fullName" className="block text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-gray-900 transition-colors"
                            />
                        </div>

                        {/* email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-gray-900 transition-colors"
                            />
                        </div>

                        {/* message */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}

                                onChange={handleChange}
                                required
                                rows={6}
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-gray-900 transition-colors"
                            />
                        </div>

                        {/* optional */}
                        <div className="mb-6">
                            <p className="block text-gray-700 mb-2">Optional</p>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="isUrgent"
                                    name="isUrgent"
                                    checked={formData.isUrgent}
                                    onChange={handleChange}
                                    className="h-4 w-4 border-gray-300"
                                />
                                <label htmlFor="isUrgent" className="ml-2 text-gray-700">
                                    This is urgent
                                </label>
                            </div>
                        </div>

                        {/* type de message */}
                        <div className="mb-10 text-gray-600">
                            <label htmlFor="inquiryType" className="block text-gray-900 mb-2 ">Select an option</label>
                            <select
                                id="inquiryType"
                                name="inquiryType"
                                value={formData.inquiryType}
                                onChange={handleChange}
                                className="w-full border-b border-gray-300 py-2 outline-none focus:border-gray-900 transition-colors appearance-none"
                            >
                                <option value="General Inquires text-gray-900">General Inquires</option>
                                <option value="Product Question">Product Question</option>
                                <option value="Order Support">Order Support</option>
                                <option value="Wholesale Inquiry">Wholesale Inquiry</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* submit bouton */}
                        <button
                            type="submit"
                            className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition-colors"
                        >
                            SEND
                        </button>

                        {/* policy */}
                        <p className="text-gray-500 text-sm mt-4">
                            This site is protected by hCaptcha and the hCaptcha Privacy Policy and Terms of Service apply.
                        </p>
                    </form>
                </div>
            <Footer />
        </div>
    );
}