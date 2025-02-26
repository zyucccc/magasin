'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// @ts-ignore
import { X } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    imageSrc: string;
    onSale: boolean;
    inStock: boolean;
}

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

    // Simulate fetching products from API/database
    useEffect(() => {
        // This would normally be a fetch call to your API
        const fetchProducts = async () => {
            // Simulated product data
            const productData: Product[] = [
                {
                    id: 1,
                    name: 'Sparkle Ruby Chalcedony Necklace - Happiness',
                    category: 'Necklaces',
                    price: 0,
                    originalPrice: 169.00,
                    imageSrc: '/images/ruby-necklace.jpg',
                    onSale: true,
                    inStock: false,
                },
                {
                    id: 2,
                    name: 'Sparkle Lapis Lazuli Necklace - Protect Negative Energy',
                    category: 'Necklaces',
                    price: 138.00,
                    originalPrice: 169.00,
                    imageSrc: '/images/lapis-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 3,
                    name: 'NEW - Forest Green Agate Necklace - Renewal & Growth',
                    category: 'Necklaces',
                    price: 241.00,
                    originalPrice: 273.00,
                    imageSrc: '/images/green-agate-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 4,
                    name: 'Lapis Lazuli Necklace - Protect From Negative Energy',
                    category: 'Necklaces',
                    price: 228.00,
                    originalPrice: 287.00,
                    imageSrc: '/images/lapis-large-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 5,
                    name: 'Sparkle Amethyst Chalcedony Necklace - Intuition & Awareness',
                    category: 'Necklaces',
                    price: 138.00,
                    originalPrice: 169.00,
                    imageSrc: '/images/amethyst-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 6,
                    name: 'Sparkle Aquamarine Necklace - Calm The Anxieties',
                    category: 'Necklaces',
                    price: 138.00,
                    originalPrice: 169.00,
                    imageSrc: '/images/aquamarine-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 7,
                    name: 'Sparkle Clear Quartz Necklace - Spiritual Growth',
                    category: 'Necklaces',
                    price: 138.00,
                    originalPrice: 169.00,
                    imageSrc: '/images/clear-quartz-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 8,
                    name: 'Sparkle Black Onyx Necklace - Serenity',
                    category: 'Necklaces',
                    price: 138.00,
                    originalPrice: 169.00,
                    imageSrc: '/images/black-onyx-sparkle-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                {
                    id: 9,
                    name: 'Black Onyx Necklace - Calm & Serenity',
                    category: 'Necklaces',
                    price: 234.00,
                    originalPrice: 273.00,
                    imageSrc: '/images/black-onyx-necklace.jpg',
                    onSale: true,
                    inStock: true,
                },
                // Add bracelets
                {
                    id: 10,
                    name: 'Rose Quartz Bracelet - Love & Harmony',
                    category: 'Bracelets',
                    price: 89.00,
                    originalPrice: 109.00,
                    imageSrc: '/images/rose-quartz-bracelet.jpg',
                    onSale: true,
                    inStock: true,
                },
                // Add crystal kits
                {
                    id: 11,
                    name: 'Healing Crystal Kit - Beginner',
                    category: 'Crystal Kits',
                    price: 75.00,
                    originalPrice: 95.00,
                    imageSrc: '/images/crystal-kit.jpg',
                    onSale: true,
                    inStock: true,
                },
                // Add holiday special
                {
                    id: 12,
                    name: 'Holiday Crystal Gift Set',
                    category: 'Holiday Special',
                    price: 120.00,
                    originalPrice: 150.00,
                    imageSrc: '/images/holiday-set.jpg',
                    onSale: true,
                    inStock: false,
                },
            ];

            setProducts(productData);
            setFilteredProducts(productData);
            setLoading(false);
        };

        fetchProducts();
    }, []);

    // Get unique categories
    const categories = Array.from(new Set(products.map(p => p.category)));

    // Apply filters and sorting
    useEffect(() => {
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
    }, [products, selectedCategory, filters, sortOption]);

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

    if (loading) {
        return <div className="container mx-auto px-4 py-16">Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">
                {selectedCategory || "Shop All"}
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters sidebar */}
                <div className="w-full md:w-64 flex-shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="md:hidden flex items-center text-sm font-medium"
                        >
              <span>{showFilters ? 'HIDE' : 'SHOW'} FILTERS ({
                  (filters.inStock || filters.outOfStock ? 1 : 0) + filters.categories.length
              })</span>
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showFilters ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                            </svg>
                        </button>

                        <div className="flex gap-2">
                            {(filters.inStock || filters.outOfStock || filters.categories.length > 0) && (
                                <button
                                    onClick={clearFilters}
                                    className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center"
                                >
                                    Clear Filters
                                </button>
                            )}

                            {filters.inStock && (
                                <div className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center">
                                    In stock
                                    <button onClick={() => toggleFilter('inStock')} className="ml-2">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}

                            {filters.outOfStock && (
                                <div className="text-sm border border-gray-300 px-3 py-1 rounded flex items-center">
                                    Out of stock
                                    <button onClick={() => toggleFilter('outOfStock')} className="ml-2">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={`space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
                        {/* Sidebar Menu */}
                        <div>
                            <h3 className="font-medium mb-3 flex justify-between items-center">
                                Sidebar Menu
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
                                            className="mr-2"
                                        />
                                        <label htmlFor={`category-${category}`}>{category}</label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div>
                            <h3 className="font-medium mb-3 flex justify-between items-center">
                                Availability (2)
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </h3>
                            <div className="space-y-2">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="in-stock"
                                        checked={filters.inStock}
                                        onChange={() => toggleFilter('inStock')}
                                        className="mr-2"
                                    />
                                    <label htmlFor="in-stock">In stock</label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="out-of-stock"
                                        checked={filters.outOfStock}
                                        onChange={() => toggleFilter('outOfStock')}
                                        className="mr-2"
                                    />
                                    <label htmlFor="out-of-stock">Out of stock</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product grid */}
                <div className="flex-1">
                    <div className="flex justify-end mb-4">
                        <div className="relative">
                            <select
                                value={sortOption}
                                onChange={handleSortChange}
                                className="appearance-none border rounded-md py-2 pl-3 pr-10 text-sm"
                            >
                                <option value="default">SORT BY</option>
                                <option value="price-low">Price, low to high</option>
                                <option value="price-high">Price, high to low</option>
                                <option value="name-asc">Name, A-Z</option>
                                <option value="name-desc">Name, Z-A</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="group">
                                <div className="relative mb-2 aspect-square overflow-hidden bg-gray-100">
                                    {product.onSale && (
                                        <div className="absolute top-2 left-2 bg-gray-200 px-2 py-1 text-xs">
                                            SALE
                                        </div>
                                    )}
                                    <div className="h-full w-full relative">
                                        {/* This would normally be an actual image */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            {/* Placeholder for product image */}
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">{product.name}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <h3 className="text-sm font-medium">{product.name}</h3>
                                    <div className="mt-1 flex justify-center">
                                        <span className="text-sm font-medium">${product.price.toFixed(2)}</span>
                                        {product.originalPrice > product.price && (
                                            <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                                        )}
                                    </div>
                                    <div className="mt-2">
                                        {product.inStock ? (
                                            <span className="text-sm text-gray-600">In Stock</span>
                                        ) : (
                                            <span className="text-sm text-gray-600">Sold Out</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}