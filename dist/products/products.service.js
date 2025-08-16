"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const products_repository_1 = require("./products.repository");
let ProductsService = class ProductsService {
    productsRepository;
    constructor(productsRepository) {
        this.productsRepository = productsRepository;
    }
    async create(createProductDto) {
        const existingProduct = await this.productsRepository.findBySlug(createProductDto.slug);
        if (existingProduct) {
            throw new common_1.BadRequestException('Product slug already exists');
        }
        const product = await this.productsRepository.create(createProductDto);
        return this.toResponseDto(product);
    }
    async findAll(page = 1, limit = 10, filter) {
        const skip = (page - 1) * limit;
        const products = await this.productsRepository.findAll(skip, limit, filter);
        return products.map(product => this.toResponseDto(product));
    }
    async findOne(id) {
        const product = await this.productsRepository.findById(id);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.toResponseDto(product);
    }
    async findBySlug(slug) {
        const product = await this.productsRepository.findBySlug(slug);
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.toResponseDto(product);
    }
    async findBySupplierId(supplierId) {
        const products = await this.productsRepository.findBySupplierId(supplierId);
        return products.map(product => this.toResponseDto(product));
    }
    async update(id, updateProductDto) {
        const existingProduct = await this.productsRepository.findById(id);
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (updateProductDto.slug && updateProductDto.slug !== existingProduct.slug) {
            const slugExists = await this.productsRepository.findBySlug(updateProductDto.slug);
            if (slugExists) {
                throw new common_1.BadRequestException('Product slug already exists');
            }
        }
        const product = await this.productsRepository.update(id, updateProductDto);
        return this.toResponseDto(product);
    }
    async remove(id) {
        const existingProduct = await this.productsRepository.findById(id);
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.productsRepository.delete(id);
    }
    async updateRating(id, rating, reviewCount) {
        const product = await this.productsRepository.updateRating(id, rating, reviewCount);
        return this.toResponseDto(product);
    }
    toResponseDto(product) {
        return {
            id: product.id,
            slug: product.slug,
            name: product.name,
            description: product.description,
            price: Number(product.price),
            stock: product.stock,
            image: product.image,
            category: product.category,
            status: product.status,
            rating: Number(product.rating),
            reviewCount: product.reviewCount,
            origin: product.origin,
            weight: product.weight,
            tags: product.tags,
            createdAt: product.createdAt,
            supplier: product.supplier,
            reviews: product.reviews,
        };
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_repository_1.ProductsRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map