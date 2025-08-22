import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductFilter } from './interfaces/products.repository.interface';
import { RoleName } from '@prisma/client';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: ProductsRepository);
    create(createProductDto: CreateProductDto, currentUserId: number, currentUserRole: RoleName): Promise<ProductResponseDto>;
    findAll(page?: number, limit?: number, filter?: ProductFilter): Promise<ProductResponseDto[]>;
    findOne(id: number): Promise<ProductResponseDto>;
    findBySlug(slug: string): Promise<ProductResponseDto>;
    findBySupplierId(supplierId: number): Promise<ProductResponseDto[]>;
    update(id: number, updateProductDto: UpdateProductDto, currentUserId: number, currentUserRole: RoleName): Promise<ProductResponseDto>;
    remove(id: number, currentUserId: number, currentUserRole: RoleName): Promise<void>;
    forceDelete(id: number, currentUserRole: RoleName): Promise<void>;
    restore(id: number, currentUserRole: RoleName): Promise<ProductResponseDto>;
    updateRating(id: number, rating: number, reviewCount: number): Promise<ProductResponseDto>;
    private toResponseDto;
}
