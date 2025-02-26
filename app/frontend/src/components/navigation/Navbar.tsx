import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
    const [mouse_on_Link, set_mouse_on_link] = useState('/init')

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-white hover:text-gray-200">
                            MaiMai Christaux
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden sm:flex sm:space-x-8 flex-1 justify-center">
                        <Link href="/" className="relative uppercase text-white hover:text-gray-200 px-3 py-2 group tracking-widest text-sm font-normal"
                              onMouseEnter={() => set_mouse_on_link('/')}
                              onMouseLeave={() => set_mouse_on_link('/init')}>
                            Home
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${mouse_on_Link === '/' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}></span>
                        </Link>
                        <Link href="/shop_all" className="relative uppercase text-white hover:text-gray-200 px-3 py-2 group tracking-widest text-sm font-normal"
                              onMouseEnter={() => set_mouse_on_link('/shop_all')}
                              onMouseLeave={() => set_mouse_on_link('/init')}>
                            Shop All
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${mouse_on_Link === '/shop_all' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}></span>
                        </Link>
                        <Link href="/contact" className="relative uppercase text-white hover:text-gray-200 px-3 py-2 group tracking-widest text-sm font-normal"
                              onMouseEnter={() => set_mouse_on_link('/contact')}
                              onMouseLeave={() => set_mouse_on_link('/init')}>
                            Contact
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${mouse_on_Link === '/contact' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}></span>
                        </Link>
                        <Link href="/services" className="relative uppercase text-white hover:text-gray-200 px-3 py-2 group tracking-widest text-sm font-normal"
                              onMouseEnter={() => set_mouse_on_link('/services')}
                              onMouseLeave={() => set_mouse_on_link('/init')}>
                            About Us
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-transform duration-300 ${mouse_on_Link === '/services' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}></span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button className="text-gray-700 hover:text-gray-900">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}