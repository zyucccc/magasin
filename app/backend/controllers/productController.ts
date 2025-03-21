/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from '@/prisma/prismaClient';
// get all products
export async function getAllProducts() {
    const articles = await prisma.article.findMany({
        include: {
            categorie: true,
            stocks: {
                include: {
                    taille: true
                }
            }
        }
    });

    // transform the data to match the frontend
    return articles.map(article => {
        // check stock
        const hasStock = article.stocks.some(stock => stock.quantite > 0);

        // taille array
        const sizes = article.stocks.map(stock => ({
            id: stock.taille_id,
            name: stock.taille.nom,
            inStock: stock.quantite > 0
        }));

        const hasDiscount = Math.random() > 0.6;
        const originalPrice =  article.prix.toNumber();

        return {
            id: article.id,
            name: article.nom,
            category: article.categorie?.nom || 'Non catégorisé',
            price: article.prix.toNumber(),
            originalPrice: originalPrice ? parseFloat(originalPrice.toFixed(2)) : undefined,
            imageSrc: article.image || '',
            onSale: hasDiscount,
            inStock: hasStock,
            sizes: sizes
        };
    });
}

export async function getProductById(id: number) {
    const article = await prisma.article.findUnique({
        where: { id },
        include: {
            categorie: true,
            stocks: {
                include: {
                    taille: true
                }
            }
        }
    });

    if (!article) {
        return null;
    }

    return transformArticleToProduct(article, true);
}

export async function getRelatedProducts(id: number, categoryId: number | null) {
    let relatedArticles: any[] = [];

    if (categoryId) {
        relatedArticles = await prisma.article.findMany({
            where: {
                categorie_id: categoryId,
                id: { not: id }
            },
            include: {
                categorie: true,
                stocks: {
                    include: {
                        taille: true
                    }
                }
            },
            take: 4
        });
    }

    // si le nombre d'articles liés est inférieur à 4, nous devons en obtenir d'autres
    if (relatedArticles.length < 4) {
        const otherArticles = await prisma.article.findMany({
            where: {
                id: { not: id },
                ...(categoryId && { categorie_id: { not: categoryId } })
            },
            include: {
                categorie: true,
                stocks: {
                    include: {
                        taille: true
                    }
                }
            },
            take: 4 - relatedArticles.length
        });

        relatedArticles = [...relatedArticles, ...otherArticles];
    }

    return relatedArticles.map(article => transformArticleToProduct(article));
}

// transfer db article to product
function transformArticleToProduct(article: any, includeDetails: boolean = true) {
    // check stock
    const hasStock = article.stocks.some((stock: any) => stock.quantite > 0);

    const sizes = article.stocks.map((stock: any) => ({
        id: stock.taille_id,
        name: stock.taille.nom,
        inStock: stock.quantite > 0
    }));

    const hasDiscount = Math.random() > 0.6;
    const originalPrice = article.prix.toNumber();
    const discountedPrice = hasDiscount ? originalPrice * 0.8 : originalPrice;

    const product = {
        id: article.id,
        name: article.nom,
        categoryId: article.categorie_id,
        category: article.categorie?.nom || 'Non catégorisé',
        price: discountedPrice,
        originalPrice: hasDiscount ? originalPrice : undefined,
        imageSrc: article.image || '',
        onSale: hasDiscount,
        inStock: hasStock,
        sizes: sizes
    };

    // extras details
    if (includeDetails) {
        return {
            ...product,
            description: article.description || '',
            categoryId: article.categorie_id,
            details: {
                material: 'good materials',
                dimensions: 'normal size',
                care: 'careful to use'
            },
            features: [
                'producted with good materials',
                'comfortable to wear'
            ]
        };
    }

    return product;
}