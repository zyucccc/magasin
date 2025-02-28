// @/app/interfaces/interfaces.ts

export interface Size {
    id: number;
    name: string;
    inStock: boolean;
}

export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    imageSrc: string;
    onSale: boolean;
    inStock: boolean;
    sizes: Size[];
}

export interface ProductDetail extends Product {
    description: string;
    categoryId: number | null;  // 添加此字段
    details?: {
        material: string;
        dimensions: string;
        care: string;
    };
    features: string[];
}