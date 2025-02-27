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
    originalPrice: number;
    imageSrc: string;
    onSale: boolean;
    inStock: boolean;
}