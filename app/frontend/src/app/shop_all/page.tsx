'use client';

import { useState, useEffect } from 'react';
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import { Product, Size } from "@/app/interfaces/interfaces";
import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import { X } from 'lucide-react';

export default function ShopAll() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [filters, setFilters] = useState<{
        inStock: boolean;
        outOfStock: boolean;
        categories: string[];
    }>({
        inStock: false,
        outOfStock: false,
        categories: [],
    });
    const [showFilters, setShowFilters] = useState(false);
    const [sortOption, setSortOption] = useState('default');
    //pages
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;

    //////////////////////////////////////////////////////////////
    ////                                                     /////
    ////              load all products from API             /////
    ////                                                     /////
    //////////////////////////////////////////////////////////////
    useEffect(() => {
        const fetchProducts = async () => {
            try{
               const response = await fetch('/api/products');
               if(!response.ok){
                   throw new Error('Network response was not ok');
               }
               const products_results = await response.json();
                setProducts(products_results);
                setFilteredProducts(products);
            }catch (error){
                console.error('Error fetching products:', error);
            }finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Get unique categories
    const categories = Array.from(new Set(products.map(p => p.category)));

    //////////////////////////////////////////////////////////////
    ////                                                     /////
    ////              Apply filters and sorting              /////
    ////                                                     /////
    //////////////////////////////////////////////////////////////
    useEffect(() => {
        // copy of products
        let result = [...products];

        // Apply category filter
        if (selectedCategory) {
            result = result.filter(p => p.category === selectedCategory);
        }

        // Apply stock filters
        if (filters.inStock && !filters.outOfStock) {
            result = result.filter(p => p.inStock);
        } else if (!filters.inStock && filters.outOfStock) {
            result = result.filter(p => !p.inStock);
        }

        // Apply category filters
        if (filters.categories.length > 0) {
            result = result.filter(p => filters.categories.includes(p.category));
        }

        // Apply sorting
        if (sortOption === 'price-low') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high') {
            result.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'name-asc') {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'name-desc') {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        setFilteredProducts(result);
        //after changing filters, go back to page 1
        setCurrentPage(1);
    }, [products, selectedCategory, filters, sortOption]);


    // change state of selected filter / category
    const toggleFilter = (filter: 'inStock' | 'outOfStock') => {
        setFilters({
            ...filters,
            [filter]: !filters[filter]
        });
    };

    const toggleCategoryFilter = (category: string) => {
        if (filters.categories.includes(category)) {
            setFilters({
                ...filters,
                categories: filters.categories.filter(c => c !== category)
            });
        } else {
            setFilters({
                ...filters,
                categories: [...filters.categories, category]
            });
        }
    };

    const clearFilters = () => {
        setFilters({
            inStock: false,
            outOfStock: false,
            categories: []
        });
        setSelectedCategory(null);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOption(e.target.value);
    };

    //distribute products on pages
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    // page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        // back to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    //////////////////////////////////////////////////////////////
    ////                                                     /////
    ////                     Interfaces                      /////
    ////                                                     /////
    //////////////////////////////////////////////////////////////
    //loading interface
    if (loading) {
        return (
            <div className="bg-white w-full min-h-screen">
                <div className="container mx-auto px-4 py-16 text-black">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white w-full min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8 pt-20">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">
                    {selectedCategory || "Shop All"}
                </h1>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Filters sidebar */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden flex items-center text-sm font-medium text-gray-700"
                            >
                                <span>{showFilters ? 'HIDE' : 'SHOW'} FILTERS ({
                                    (filters.inStock || filters.outOfStock ? 1 : 0) + filters.categories.length
                                })</span>
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d={showFilters ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                                </svg>
                            </button>

                            <div className="flex gap-2">
                                {(filters.inStock || filters.outOfStock || filters.categories.length > 0) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center text-gray-700 hover:bg-gray-100"
                                    >
                                        Clear Filters
                                    </button>
                                )}

                                {filters.inStock && (
                                    <div className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center text-gray-700 bg-gray-50">
                                        In stock
                                        <button onClick={() => toggleFilter('inStock')} className="ml-2 text-gray-500 hover:text-gray-700">
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}

                                {filters.outOfStock && (
                                    <div className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center text-gray-700 bg-gray-50">
                                        Out of stock
                                        <button onClick={() => toggleFilter('outOfStock')} className="ml-2 text-gray-500 hover:text-gray-700">
                                            <X size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'} pt-10`}>
                            {/* Sidebar Menu */}
                            <div className="border border-gray-200 rounded-md p-4">
                                <h3 className="font-medium mb-3 flex justify-between items-center text-gray-700">
                                    Sidebar Menu
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7" />
                                    </svg>
                                </h3>
                                <div className="space-y-2">
                                    {categories.map(category => (
                                        <div key={category} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id={`category-${category}`}
                                                checked={filters.categories.includes(category)}
                                                onChange={() => toggleCategoryFilter(category)}
                                                className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <label htmlFor={`category-${category}`} className="text-gray-700">{category}</label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="border border-gray-200 rounded-md p-4">
                                <h3 className="font-medium mb-3 flex justify-between items-center text-gray-700">
                                    Availability (2)
                                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7" />
                                    </svg>
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="in-stock"
                                            checked={filters.inStock}
                                            onChange={() => toggleFilter('inStock')}
                                            className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="in-stock" className="text-gray-700">In stock</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="out-of-stock"
                                            checked={filters.outOfStock}
                                            onChange={() => toggleFilter('outOfStock')}
                                            className="mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="out-of-stock" className="text-gray-700">Out of stock</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product grid */}
                    {/*sort bouton list*/}
                    <div className="flex-1">
                        <div className="flex justify-end mb-4">
                            <div className="relative">
                                <select
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    className="appearance-none border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                >
                                    <option value="default">SORT BY</option>
                                    <option value="price-low">Price, low to high</option>
                                    <option value="price-high">Price, high to low</option>
                                    <option value="name-asc">Name, A-Z</option>
                                    <option value="name-desc">Name, Z-A</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/*products list*/}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map((product) => (
                                <div key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                                    <div className="relative mb-2 aspect-square overflow-hidden bg-gray-100">
                                        {product.onSale && (
                                            <div className="absolute top-2 left-2 bg-red-100 text-red-700 px-2 py-1 text-xs font-medium rounded">
                                                SALE
                                            </div>
                                        )}
                                        <div className="h-full w-full relative">
                                            {product.imageSrc ? (
                                                <Image
                                                    src={product.imageSrc}
                                                    alt={product.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                        <span className="text-black text-center px-4">{product.name}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-center p-4">
                                        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>
                                        <div className="mt-1 flex justify-center">
                                            <span className="text-sm font-medium text-gray-900">
                                                ${product.price.toFixed(2)}
                                            </span>
                                            {product.originalPrice > product.price && (
                                                <span className="text-sm text-gray-500 line-through ml-2">
                                                    ${product.originalPrice.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            {product.inStock ? (
                                                <span className="text-sm text-green-600 font-medium">In Stock</span>
                                            ) : (
                                                <span className="text-sm text-red-600 font-medium">Sold Out</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        {totalPages > 0 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`mx-1 px-3 py-1 rounded ${
                                            currentPage === 1
                                                ? 'text-black cursor-not-allowed'
                                                : 'text-black hover:bg-gray-100'
                                        }`}
                                    >
                                        Previous
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handlePageChange(i + 1)}
                                            className={`mx-1 px-3 py-1 rounded ${
                                                currentPage === i + 1
                                                    ? 'border text-black border-gray-800 font-normal'
                                                    : 'text-gray-700 hover:bg-gray-100 border border-transparent'
                                            }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`mx-1 px-3 py-1 rounded ${
                                            currentPage === totalPages
                                                ? 'text-black cursor-not-allowed'
                                                : 'text-black hover:bg-gray-100'
                                        }`}
                                    >
                                        Next
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}