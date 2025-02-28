'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from "@/app/frontend/src/components/navigation/Navbar";
import Footer from "@/app/frontend/src/components/footer/Footer";
import { ProductDetail, Product, Size } from '@/app/interfaces/interfaces';

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id;

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [selectedSize, setSelectedSize] = useState<Size | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('DESCRIPTION');

    // get product details
    useEffect(() => {
        const fetchProductDetail = async () => {
            if (!productId) return;

            try {
                setLoading(true);
                const response = await fetch(`/api/products/${productId}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }

                const productData = await response.json();
                setProduct(productData);

                // 如果有库存的尺码，默认选择第一个有库存的尺码
                const inStockSize = productData.sizes.find((size: Size) => size.inStock);
                if (inStockSize) {
                    setSelectedSize(inStockSize);
                }

                // 获取相关产品
                const relatedResponse = await fetch(`/api/products?id=${productId}&related=true`);
                if (relatedResponse.ok) {
                    const relatedData = await relatedResponse.json();
                    setRelatedProducts(relatedData);
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetail();
    }, [productId]);

    // 处理数量变更
    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(parseInt(e.target.value, 10));
    };

    // 处理尺码选择
    const handleSizeSelect = (size: Size) => {
        if (size.inStock) {
            setSelectedSize(size);
        }
    };

    // 加入购物车
    const handleAddToCart = () => {
        if (!product || !selectedSize) {
            alert('请先选择尺寸');
            return;
        }

        // panier
        alert(`已加入购物车: ${product.name}, 尺寸: ${selectedSize.name}, 数量: ${quantity}`);
    };

    if (loading) {
        return (
            <div className="bg-white w-full min-h-screen">
                <Navbar theme="light" />
                <div className="container mx-auto px-4 py-16 pt-24 text-gray-800">Loading...</div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-white w-full min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-16 pt-24 text-gray-800">
                    <h1 className="text-2xl font-bold mb-4">产品不存在</h1>
                    <Link href="/shop-all" className="text-indigo-600 hover:text-indigo-800">
                        返回商品列表
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-white w-full min-h-screen">
            <Navbar />

            {/* 面包屑导航 */}
            <div className="container mx-auto px-4 py-4 pt-20 text-sm">
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 md:space-x-3">
                        <li className="inline-flex items-center">
                            <Link href="/" className="text-gray-600 hover:text-gray-900">
                                HOME
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <Link href="/frontend/src/app/shop_all" className="text-gray-600 hover:text-gray-900">
                                    Products
                                </Link>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div className="flex items-center">
                                <span className="mx-2 text-gray-400">/</span>
                                <span className="text-gray-500">{product.name}</span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>

            {/* product details */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* image */}
                    <div className="w-full md:w-1/2">
                        <div className="relative h-96 md:h-[600px] mb-4 bg-gray-100 rounded-lg overflow-hidden">
                            {product.onSale && (
                                <div className="absolute top-4 left-4 bg-red-100 text-red-700 px-3 py-1 text-sm font-medium rounded z-10">
                                    Promotion
                                </div>
                            )}
                            {product.imageSrc ? (
                                <Image
                                    src={product.imageSrc}
                                    alt={product.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-gray-500">{product.name}</span>
                                </div>
                            )}
                        </div>

                        {/* thumbnail */}
                        <div className="grid grid-cols-5 gap-2">
                            {[...Array(1)].map((_, index) => (
                                <div key={index} className="aspect-square border border-gray-200 rounded-md overflow-hidden">
                                    {product.imageSrc ? (
                                        <Image
                                            src={product.imageSrc}
                                            alt={`${product.name} thumbnail ${index + 1}`}
                                            width={80}
                                            height={80}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                            <span className="text-xs text-gray-500">no image</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* product info */}
                    <div className="w-full md:w-1/2">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{product.category}</p>

                        {/* prix */}
                        <div className="mb-6 flex items-center">
                            <span className="text-2xl font-bold text-gray-900">
                                ${product.price.toFixed(2)}
                            </span>
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="ml-3 text-lg text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                            )}
                            {product.onSale && product.originalPrice && (
                                <span className="ml-3 px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
                                    省 ${(product.originalPrice - product.price).toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* promotion */}
                        {product.onSale && (
                            <div className="mb-6 bg-gray-50 border border-gray-200 px-4 py-3 rounded-md text-black">
                                {/*<p className="text-sm">额外15%折扣 - 满$160享免运费</p>*/}
                            </div>
                        )}

                        {/* Size */}
                        <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size.id}
                                        onClick={() => handleSizeSelect(size)}
                                        disabled={!size.inStock}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                                            selectedSize?.id === size.id
                                                ? 'bg-gray-900 text-white'
                                                : size.inStock
                                                    ? 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
                                                    : 'bg-gray-100 text-gray-400 border border-gray-200 cursor-not-allowed'
                                        }`}
                                    >
                                        {size.name}
                                        {!size.inStock && " epuisé"}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* quantite */}
                        <div className="mb-6">
                            <div className="flex items-center">
                                <select
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="text-black py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* bouton panier */}
                        <div className="mb-8">
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock || !selectedSize}
                                className={`w-full py-3 px-6 text-white font-medium rounded-md ${
                                    product.inStock && selectedSize
                                        ? 'bg-black hover:bg-gray-800'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {product.inStock ? 'Add to panier' : 'epuisé'}
                            </button>
                        </div>

                        {/* Features */}
                        <div className="mb-8">
                            {/*<h3 className="text-sm font-medium text-gray-900 mb-3">特点</h3>*/}
                            {/*<ul className="list-disc list-inside space-y-2 text-sm text-gray-700">*/}
                            {/*    {product.features.map((feature, index) => (*/}
                            {/*        <li key={index}>{feature}</li>*/}
                            {/*    ))}*/}
                            {/*</ul>*/}
                        </div>

                        {/* ship policy */}
                        <div className="border-t border-gray-200 pt-6">
                            <div className="flex items-center mb-4">
                                <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="text-sm text-black">ship standard 5-7 days</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                                </svg>
                                <span className="text-sm text-gray-700">return in 7 days</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* description */}
                <div className="mt-16">
                    <div className="border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Description</h2>
                    </div>
                    <div className="py-6">
                        <div className="prose max-w-none text-black">
                            <p>{product.description || 'This product is beautifully designed and is your ideal choice. '}</p>
                        </div>
                    </div>
                </div>

                {/* related product */}
                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">RELATED PRODUCTS</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <Link href={`/product_detail/${relatedProduct.id}`} key={relatedProduct.id}>
                                    <div className="group border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300">
                                        <div className="relative aspect-square bg-gray-100">
                                            {relatedProduct.onSale && (
                                                <div className="absolute top-2 left-2 bg-red-100 text-red-700 px-2 py-1 text-xs font-medium rounded z-10">
                                                    Promotion
                                                </div>
                                            )}
                                            {relatedProduct.imageSrc ? (
                                                <Image
                                                    src={relatedProduct.imageSrc}
                                                    alt={relatedProduct.name}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-gray-500 text-center px-2">{relatedProduct.name}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <h3 className="text-sm font-medium text-gray-900">{relatedProduct.name}</h3>
                                            <div className="mt-1 flex justify-between items-center">
                                                <div>
                                                    <span className="text-sm font-medium text-gray-900">
                                                        ${relatedProduct.price.toFixed(2)}
                                                    </span>
                                                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                                                        <span className="ml-2 text-xs text-gray-500 line-through">
                                                            ${relatedProduct.originalPrice.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className={`text-xs font-medium ${
                                                    relatedProduct.inStock
                                                        ? 'text-green-600'
                                                        : 'text-red-600'
                                                }`}>
                                                    {relatedProduct.inStock ? 'En stock' : 'Epuisé'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}