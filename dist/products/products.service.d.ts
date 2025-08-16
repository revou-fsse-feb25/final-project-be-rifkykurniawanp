import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/request/create-product.dto';
import { UpdateProductDto } from './dto/request/update-product.dto';
import { ProductResponseDto } from './dto/response/product.response.dto';
import { ProductFilter } from './interfaces/products.repository.interface';
export declare class ProductsService {
    private productsRepository;
    constructor(productsRepository: ProductsRepository);
    create(createProductDto: CreateProductDto): Promise<ProductResponseDto>;
    findAll(page?: number, limit?: number, filter?: ProductFilter): Promise<ProductResponseDto[]>;
    findOne(id: number): Promise<ProductResponseDto>;
    findBySlug(slug: string): Promise<ProductResponseDto>;
    findBySupplierId(supplierId: number): Promise<ProductResponseDto[]>;
    update(id: number, updateProductDto: UpdateProductDto): Promise<ProductResponseDto>;
    remove(id: number): Promise<void>;
    updateRating(id: number, rating: number, reviewCount: number): Promise<ProductResponseDto>;
    private toResponseDto;
}
