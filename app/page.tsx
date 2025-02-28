'use client'
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Carousel from "@/app/frontend/src/components/carousel/Carousel";
import Footer from "@/app/frontend/src/components/footer/Footer";
import Link from "next/link";

import { CartProvider } from "@/app/frontend/src/components/cart/CartContext";
import Cart from "@/app/frontend/src/components/cart/Cart";
// npm run dev

export default function Home() {

    return (
        <div className="bg-gray-50 w-full min-h-screen">
            <CartProvider>
            {/*navbar*/}
                <Navbar/>
                <Cart />
            {/*emblaref container*/}
            <Carousel/>
            {/*History*/}
            <div className="w-full py-20 px-14 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold mb-6 text-black tracking-wide">OUR STORY</h1>

                    <div className="max-w-3xl">
                        <p className="text-base mb-6 text-black font-light leading-relaxed">
                            MaiMai Christaux, born in Paris, is your gateway to the world of gemstones and crystals.
                        </p>

                        <p className="text-base mb-14 text-black font-light leading-relaxed">
                            Inspired by their spiritual energy and healing properties, we offer a diverse range of chic
                            gemstone jewelry and crystal specimens to accompany you on your healing journey.
                        </p>
                    </div>
                </div>
            </div>
            {/*publicite*/}
            <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg max-w-7xl mx-auto my-0">
                <div className="flex flex-col md:flex-row">
                    {/* image a gauche */}
                    <div className="md:w-1/2">
                        <img
                            src="/home_page/homepage1.jpg"
                            alt="christaux"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* description */}
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="text-gray-600 mb-2">
                            Perfect Gift
                        </div>

                        <h1 className="text-4xl font-medium text-black mb-6">
                            MaiMai Seven Chakras Crystal Healing Set
                        </h1>

                        <p className="text-gray-700 mb-8">
                            The best crystal love gift, for yourself or your loved ones,
                            may the healing power of crystals always be with your beloved.
                        </p>

                        <div className="flex space-x-4">
                            <Link href="/frontend/src/app/shop_all" className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors inline-block">
                                Shop Now
                            </Link>
                            <Link href="/frontend/src/app/shop_all" className="border border-black px-6 py-3 hover:bg-gray-100 transition-colors text-black inline-block">
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/*footer*/}
            <Footer/>
            </CartProvider>
        </div>
    );
}
