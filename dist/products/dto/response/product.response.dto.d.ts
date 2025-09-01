import { ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
import { SupplierResponseDto } from './supplier.response.dto';
import { ProductReviewResponseDto } from './product-review.response.dto';
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
    supplier: SupplierResponseDto;
    reviews?: ProductReviewResponseDto[];
}
