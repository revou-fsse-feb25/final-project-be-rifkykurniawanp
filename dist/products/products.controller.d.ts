import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductCategory, ProductOrigin, ProductStatus } from '@prisma/client';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(page?: number, limit?: number, category?: ProductCategory, origin?: ProductOrigin, status?: ProductStatus, supplierId?: number, minPrice?: number, maxPrice?: number): Promise<ProductResponseDto[]>;
    findBySupplierId(supplierId: number): Promise<ProductResponseDto[]>;
    findBySlug(slug: string): Promise<ProductResponseDto>;
    findOne(id: number): Promise<ProductResponseDto>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: number): Promise<void>;
}
