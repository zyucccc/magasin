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