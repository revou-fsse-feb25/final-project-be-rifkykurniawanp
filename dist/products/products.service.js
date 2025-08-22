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
    async create(createProductDto, currentUserId, currentUserRole) {
        const existingProduct = await this.productsRepository.findBySlugIncludingDeleted(createProductDto.slug);
        if (existingProduct && !existingProduct.deletedAt) {
            throw new common_1.BadRequestException('Product slug already exists');
        }
        let supplierId = createProductDto.supplierId;
        if (currentUserRole === 'SUPPLIER') {
            supplierId = currentUserId;
        }
        else if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN and SUPPLIER can create products');
        }
        const product = await this.productsRepository.create({
            ...createProductDto,
            supplierId,
        });
        return this.toResponseDto(product);
    }
    async findAll(page = 1, limit = 10, filter) {
        const skip = (page - 1) * limit;
        const products = await this.productsRepository.findAll(skip, limit, {
            ...filter,
            deletedAt: null
        });
        return products.map(product => this.toResponseDto(product));
    }
    async findOne(id) {
        const product = await this.productsRepository.findById(id, { deletedAt: null });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.toResponseDto(product);
    }
    async findBySlug(slug) {
        const product = await this.productsRepository.findBySlug(slug, { deletedAt: null });
        if (!product) {
            throw new common_1.NotFoundException('Product not found');
        }
        return this.toResponseDto(product);
    }
    async findBySupplierId(supplierId) {
        const products = await this.productsRepository.findBySupplierId(supplierId, { deletedAt: null });
        return products.map(product => this.toResponseDto(product));
    }
    async update(id, updateProductDto, currentUserId, currentUserRole) {
        const existingProduct = await this.productsRepository.findById(id, { deletedAt: null });
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (currentUserRole === 'SUPPLIER' && existingProduct.supplierId !== currentUserId) {
            throw new common_1.ForbiddenException('You can only update your own products');
        }
        else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPPLIER') {
            throw new common_1.ForbiddenException('Only ADMIN and SUPPLIER can update products');
        }
        if (updateProductDto.slug && updateProductDto.slug !== existingProduct.slug) {
            const slugExists = await this.productsRepository.findBySlug(updateProductDto.slug, { deletedAt: null });
            if (slugExists) {
                throw new common_1.BadRequestException('Product slug already exists');
            }
        }
        const product = await this.productsRepository.update(id, updateProductDto);
        return this.toResponseDto(product);
    }
    async remove(id, currentUserId, currentUserRole) {
        const existingProduct = await this.productsRepository.findById(id, { deletedAt: null });
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        if (currentUserRole === 'SUPPLIER' && existingProduct.supplierId !== currentUserId) {
            throw new common_1.ForbiddenException('You can only delete your own products');
        }
        else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'SUPPLIER') {
            throw new common_1.ForbiddenException('Only ADMIN and SUPPLIER can delete products');
        }
        await this.productsRepository.softDelete(id);
    }
    async forceDelete(id, currentUserRole) {
        if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN can permanently delete products');
        }
        const existingProduct = await this.productsRepository.findByIdIncludingDeleted(id);
        if (!existingProduct) {
            throw new common_1.NotFoundException('Product not found');
        }
        await this.productsRepository.hardDelete(id);
    }
    async restore(id, currentUserRole) {
        if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN can restore products');
        }
        const product = await this.productsRepository.findByIdIncludingDeleted(id);
        if (!product || !product.deletedAt) {
            throw new common_1.NotFoundException('Deleted product not found');
        }
        const restoredProduct = await this.productsRepository.restore(id);
        return this.toResponseDto(restoredProduct);
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