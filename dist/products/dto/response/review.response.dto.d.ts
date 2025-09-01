import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
export declare class ProductResponseDto {
    id: number;
    slug: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image?: string;
    category: ProductCategory;
    status: ProductStatus;
    rating: number;
    reviewCount: number;
    origin: ProductOrigin;
    weight?: string;
    tags: ProductTagName[];
    createdAt: Date;
    supplier: {
        id: number;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    reviews?: Array<{
        id: number;
        rating: number;
        comment?: string;
        createdAt: Date;
        user: {
            id: number;
            firstName?: string;
            lastName?: string;
        };
    }>;
}
