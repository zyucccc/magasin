import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-emerald-600 hover:text-emerald-800">
                            MaiMai Christaux
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden sm:flex sm:space-x-8 flex-1 justify-center">
                        <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                            Home
                        </Link>
                        <Link href="/shop_all" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                            Shop All
                        </Link>
                        <Link href="/contact" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                            Contact
                        </Link>
                        <Link href="/services" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md">
                            About Us
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