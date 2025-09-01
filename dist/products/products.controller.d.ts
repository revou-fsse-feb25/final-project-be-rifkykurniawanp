import { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductCategory, ProductOrigin, ProductStatus } from '@prisma/client';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
        email: string;
    };
}
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto, req: AuthenticatedRequest): Promise<ProductResponseDto>;
    findAll(page?: string, limit?: string, category?: ProductCategory, origin?: ProductOrigin, status?: ProductStatus, supplierId?: string, minPrice?: string, maxPrice?: string, tags?: string, search?: string): Promise<ProductResponseDto[]>;
    findBySlug(slug: string): Promise<ProductResponseDto>;
    findBySupplierId(supplierId: number): Promise<ProductResponseDto[]>;
    findOne(id: number): Promise<ProductResponseDto>;
    update(id: number, updateProductDto: UpdateProductDto, req: AuthenticatedRequest): Promise<ProductResponseDto>;
    remove(id: number, req: AuthenticatedRequest): Promise<void>;
    forceDelete(id: number, req: AuthenticatedRequest): Promise<void>;
    restore(id: number, req: AuthenticatedRequest): Promise<ProductResponseDto>;
}
export {};
