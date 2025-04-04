import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getProductById, getRelatedProducts } from '@/app/backend/controllers/productController';

export async function GET(
    request: NextRequest,
    // { params }: { params: { id: string } }
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // const id = params?.id;
        const { id } = await params;
        if (!id) {
            return NextResponse.json(
                { error: 'Missing product ID' },
                { status: 400 }
            );
        }

        const productId = parseInt(id, 10);

        if (isNaN(productId)) {
            return NextResponse.json(
                { error: 'invalid product ID' },
                { status: 400 }
            );
        }

        const url = new URL(request.url);
        const related = url.searchParams.get('related') === 'true';

        if (related) {
            // get related products
            const product = await getProductById(productId);
            if (!product) {
                return NextResponse.json(
                    { error: 'product non found' },
                    { status: 404 }
                );
            }

            const relatedProducts = await getRelatedProducts(productId, product.categoryId || null);
            return NextResponse.json(relatedProducts);
        } else {
            // product details
            const product = await getProductById(productId);

            if (!product) {
                return NextResponse.json(
                    { error: 'product non found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(product);
        }
    } catch (error) {
        console.error('fails to find product:', error);
        return NextResponse.json(
            { error: 'fails to find product' },
            { status: 500 }
        );
    }
}