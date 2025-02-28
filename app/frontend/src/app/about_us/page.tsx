'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Cart from '@/app/frontend/src/components/cart/Cart';

export default function AboutUsPage() {
    return (
        <div className="bg-white w-full min-h-screen">
                <Navbar />
                <Cart />
                <div className="container mx-auto px-4 py-20">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        {/* gauche */}
                        <div className="w-full md:w-1/2">
                            <h1 className="text-4xl font-bold text-gray-900 mb-8">About us</h1>

                            <p className="text-xl font-medium mb-6 text-gray-900">
                                <span className="italic">MaiMai Christaux</span>, established in Paris, is your gateway to
                                the world of fine crystals and healing stones.
                            </p>

                            <p className="text-lg text-gray-700 mb-6">
                                Inspired by the natural energy and beauty of Earth's minerals,
                                we carefully select and offer a diverse collection of premium crystals
                                and elegant crystal jewelry to enhance your spiritual journey and living space.
                            </p>

                            <p className="text-lg text-gray-700 mb-8">
                                Each piece in our collection is chosen for its unique properties,
                                quality, and energetic resonance. We believe in the transformative
                                power of crystals and their ability to bring harmony, balance,
                                and positive energy into your life.
                            </p>

                            <p className="text-xl italic text-gray-900">
                                Let the crystal energy illuminate your path.
                            </p>
                        </div>

                        {/* image droite */}
                        <div className="w-full md:w-1/2 flex justify-center">
                            <div className="relative w-full max-w-md aspect-square bg-gray-100">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold mb-1 text-blue-500">MaiMai</div>
                                        <div className="text-2xl mb-6 text-blue-500">Christaux</div>

                                        <div className="relative h-60 w-60 mx-auto">
                                            <div className="absolute top-0 left-1/4 h-16 w-16 rounded-full bg-purple-200 opacity-80"></div>
                                            <div className="absolute top-1/4 right-0 h-14 w-14 rounded-full bg-yellow-200 opacity-80"></div>
                                            <div className="absolute bottom-0 left-1/3 h-20 w-20 rounded-full bg-blue-200 opacity-80"></div>
                                            <div className="absolute bottom-1/4 left-0 h-18 w-18 rounded-full bg-red-200 opacity-80"></div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-gray-200 opacity-60"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-3 text-black">Quality</h3>
                                <p className="text-gray-700">We source only the finest crystal specimens from trusted suppliers around the world, ensuring authenticity and energy integrity.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-3 text-black">Education</h3>
                                <p className="text-gray-700">We believe in empowering our customers with knowledge about the properties and benefits of each crystal in our collection.</p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h3 className="text-lg font-medium mb-3 text-black">Community</h3>
                                <p className="text-gray-700">We're building a community of crystal enthusiasts, offering resources, events, and a space to share experiences and knowledge.</p>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
    );
}