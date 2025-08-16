import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
export declare class CreateProductDto {
    slug: string;
    name: string;
    description?: string;
    price: number;
    stock?: number;
    image?: string;
    category: ProductCategory;
    status: ProductStatus;
    supplierId: number;
    origin: ProductOrigin;
    weight?: string;
    tags?: ProductTagName[];
}
