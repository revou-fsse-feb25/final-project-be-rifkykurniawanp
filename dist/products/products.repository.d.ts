import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { IProductsRepository, CreateProductData, UpdateProductData, ProductFilter } from './interfaces/products.repository.interface';
export declare class ProductsRepository implements IProductsRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateProductData): Promise<Product>;
    findById(id: number): Promise<Product | null>;
    findBySlug(slug: string): Promise<Product | null>;
    findAll(skip?: number, take?: number, filter?: ProductFilter): Promise<Product[]>;
    update(id: number, data: UpdateProductData): Promise<Product>;
    delete(id: number): Promise<Product>;
    updateRating(id: number, rating: number, reviewCount: number): Promise<Product>;
    findBySupplierId(supplierId: number): Promise<Product[]>;
}
