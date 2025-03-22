// @/app/interfaces/interfaces.ts

//panier
export interface CartItem {
    product: Product;
    quantity: number;
    size: string;
}

export interface CartProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CartContextType {
    cartItems: CartItem[];
    isCartOpen: boolean;
    subtotal: number;
    itemCount: number;
    freeShippingQualified: boolean;
    freeShippingThreshold: number;
    addToCart: (product: Product, quantity: number, size: string) => void;
    removeFromCart: (index: number) => void;
    updateQuantity: (index: number, quantity: number) => void;
    openCart: () => void;
    closeCart: () => void;
    clearCart: () => void;
}

export interface OrderSummary {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

//user interface
export interface RegisterUserData {
    email: string;
    password: string;
    nom: string;
    prenom: string;
    adresse?: string;
    code_postal?: string;
    ville?: string;
    pays?: string;
    telephone?: string;
}



//DB interface
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
    categoryId: number | null;
    details?: {
        material: string;
        dimensions: string;
        care: string;
    };
    features: string[];
}