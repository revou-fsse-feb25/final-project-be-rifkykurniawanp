import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
export declare class UpdateProductDto {
    slug?: string;
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    image?: string;
    category?: ProductCategory;
    status?: ProductStatus;
    origin?: ProductOrigin;
    weight?: string;
    tags?: ProductTagName[];
}
