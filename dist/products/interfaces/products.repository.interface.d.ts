import { Product, ProductCategory, ProductOrigin, ProductStatus, ProductTagName } from '@prisma/client';
export interface CreateProductData {
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
export interface UpdateProductData {
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
export interface ProductFilter {
    category?: ProductCategory;
    origin?: ProductOrigin;
    status?: ProductStatus;
    supplierId?: number;
    tags?: ProductTagName[];
    minPrice?: number;
    maxPrice?: number;
}
export interface IProductsRepository {
    create(data: CreateProductData): Promise<Product>;
    findById(id: number): Promise<Product | null>;
    findBySlug(slug: string): Promise<Product | null>;
    findAll(skip?: number, take?: number, filter?: ProductFilter): Promise<Product[]>;
    update(id: number, data: UpdateProductData): Promise<Product>;
    delete(id: number): Promise<Product>;
    updateRating(id: number, rating: number, reviewCount: number): Promise<Product>;
    findBySupplierId(supplierId: number): Promise<Product[]>;
}
