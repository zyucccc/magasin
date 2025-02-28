import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
// hook cart
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/app/frontend/src/components/cart/CartContext'


interface NavbarProps {
    theme?: 'light' | 'dark';
}

export default function Navbar({ theme }: NavbarProps) {
    const [mouse_on_Link, set_mouse_on_link] = useState('/init')
    const pathname = usePathname()
    // hook cart
    const { openCart, itemCount } = useCart()

    const in_light_mode = pathname === '/frontend/src/app/shop_all' || pathname.startsWith('/frontend/src/app/product_detail/')
    const autoTheme = in_light_mode ? 'light' : 'dark'
    const currentTheme = theme || autoTheme

    // set the color of the text and underline based on the current theme
    const textColor = currentTheme === 'dark' ? 'text-white' : 'text-gray-800'
    const hoverColor = currentTheme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-600'
    const underlineColor = currentTheme === 'dark' ? 'bg-white' : 'bg-gray-800'
    const bgColor = currentTheme === 'dark' ? 'bg-transparent' : 'bg-white shadow-sm'

    return (
        <nav className={`absolute top-0 left-0 right-0 z-50 ${bgColor}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className={`text-xl font-bold ${textColor} ${hoverColor}`}>
                            MaiMai Christaux
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden sm:flex sm:space-x-8 flex-1 justify-center">
                        <Link
                            href="/"
                            className={`relative uppercase ${textColor} ${hoverColor} px-3 py-2 group tracking-widest text-sm font-normal`}
                            onMouseEnter={() => set_mouse_on_link('/')}
                            onMouseLeave={() => set_mouse_on_link('/init')}
                        >
                            Home
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineColor} transition-transform duration-300 ${mouse_on_Link === '/' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}
                            ></span>
                        </Link>
                        <Link
                            href="/frontend/src/app/shop_all"
                            className={`relative uppercase ${textColor} ${hoverColor} px-3 py-2 group tracking-widest text-sm font-normal`}
                            onMouseEnter={() => set_mouse_on_link('/shop_all')}
                            onMouseLeave={() => set_mouse_on_link('/init')}
                        >
                            Shop All
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineColor} transition-transform duration-300 ${mouse_on_Link === '/shop_all' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}
                            ></span>
                        </Link>
                        <Link
                            href="/contact"
                            className={`relative uppercase ${textColor} ${hoverColor} px-3 py-2 group tracking-widest text-sm font-normal`}
                            onMouseEnter={() => set_mouse_on_link('/contact')}
                            onMouseLeave={() => set_mouse_on_link('/init')}
                        >
                            Contact
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineColor} transition-transform duration-300 ${mouse_on_Link === '/contact' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}
                            ></span>
                        </Link>
                        <Link
                            href="/services"
                            className={`relative uppercase ${textColor} ${hoverColor} px-3 py-2 group tracking-widest text-sm font-normal`}
                            onMouseEnter={() => set_mouse_on_link('/services')}
                            onMouseLeave={() => set_mouse_on_link('/init')}
                        >
                            About Us
                            <span
                                className={`absolute bottom-0 left-0 w-full h-0.5 ${underlineColor} transition-transform duration-300 ${mouse_on_Link === '/services' ? 'scale-x-100' : 'scale-x-0'} group-hover:scale-x-100 origin-left`}
                            ></span>
                        </Link>
                    </div>

                    {/* cart */}
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                // console.log("click");
                                openCart();
                            }}
                            className={`relative ${textColor} ${hoverColor} ml-4 focus:outline-none`}
                            aria-label="Shopping cart"
                        >
                            <ShoppingBag size={22} />
                            {itemCount > 0 && (
                                <span className={`absolute -top-2 -right-2 ${currentTheme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} text-xs rounded-full h-5 w-5 flex items-center justify-center`}>
                                    {itemCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button className={textColor}>
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