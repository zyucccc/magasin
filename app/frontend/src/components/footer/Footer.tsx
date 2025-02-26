import React from 'react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-black text-white p-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* first column - subscribe */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">subsribe for us</h2>
                    <p className="mb-4">Register and get special offers</p>

                    <div className="flex mb-4">
                        <input
                            type="email"
                            placeholder="email adress"
                            className="bg-transparent border-b border-white p-2 w-full text-white"
                        />
                        <button className="ml-2 border-b border-white px-4">
                            Register
                        </button>
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <a href="https://www.instagram.com/maimai_cristaux/" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                        </a>
                        <a href="#" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                            </svg>
                        </a>
                    </div>
                </div>

                {/* second column - help */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Help</h2>
                    <ul className="space-y-2">
                        <li><Link href="/faq" className="hover:underline">FAQ</Link></li>
                        <li><Link href="/shipping" className="hover:underline">Shipping Policy</Link></li>
                        <li><Link href="/refund" className="hover:underline">Refund Policy</Link></li>
                        <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
                        <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
                    </ul>
                </div>

                {/* Third column - Contact */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Contact us</h2>
                    <p className="mb-4">maimaicristaux@outlook.com</p>
                </div>
            </div>

            {/* foot */}
            <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    {/*<button className="border border-white px-4 py-2 flex items-center">*/}
                    {/*    🇨🇳 中国 (CNY ¥) <span className="ml-2">▼</span>*/}
                    {/*</button>*/}
                </div>

                <div className="flex items-center">
                    <p>© MaiMai Christaux, {new Date().getFullYear()}</p>
                    <div className="ml-4 flex space-x-2">
                        <img src="/payment/alipay.png" alt="Alipay" width="100" height="24" />
                        <img src="/payment/visa.png" alt="Visa" width="40" height="24" />
                    </div>
                </div>
            </div>
        </footer>
    );
}