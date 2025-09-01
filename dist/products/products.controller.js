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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const products_service_1 = require("./products.service");
const create_product_dto_1 = require("./dto/request/create-product.dto");
const update_product_dto_1 = require("./dto/request/update-product.dto");
const product_response_dto_1 = require("./dto/response/product.response.dto");
const client_1 = require("@prisma/client");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
let ProductsController = class ProductsController {
    productsService;
    constructor(productsService) {
        this.productsService = productsService;
    }
    create(createProductDto, req) {
        return this.productsService.create(createProductDto, req.user.id, req.user.role);
    }
    findAll(page, limit, category, origin, status, supplierId, minPrice, maxPrice, tags, search) {
        const pageNum = page ? parseInt(page) : 1;
        const limitNum = limit ? parseInt(limit) : 10;
        const filter = {
            category,
            origin,
            status,
            supplierId: supplierId ? parseInt(supplierId) : undefined,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        };
        return this.productsService.findAll(pageNum, limitNum, filter);
    }
    findBySlug(slug) {
        return this.productsService.findBySlug(slug);
    }
    findBySupplierId(supplierId) {
        return this.productsService.findBySupplierId(supplierId);
    }
    findOne(id) {
        return this.productsService.findOne(id);
    }
    update(id, updateProductDto, req) {
        return this.productsService.update(id, updateProductDto, req.user.id, req.user.role);
    }
    remove(id, req) {
        return this.productsService.remove(id, req.user.id, req.user.role);
    }
    forceDelete(id, req) {
        return this.productsService.forceDelete(id, req.user.role);
    }
    restore(id, req) {
        return this.productsService.restore(id, req.user.role);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new product' }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The product has been successfully created.',
        type: product_response_dto_1.ProductResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Product slug already exists' }),
    (0, swagger_1.ApiBody)({ type: create_product_dto_1.CreateProductDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products with optional filters' }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of products', type: [product_response_dto_1.ProductResponseDto] }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('origin')),
    __param(4, (0, common_1.Query)('status')),
    __param(5, (0, common_1.Query)('supplierId')),
    __param(6, (0, common_1.Query)('minPrice')),
    __param(7, (0, common_1.Query)('maxPrice')),
    __param(8, (0, common_1.Query)('tags')),
    __param(9, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('slug/:slug'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a product by its slug' }),
    (0, swagger_1.ApiParam)({ name: 'slug', description: 'The unique slug of the product', type: 'string' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The product with the given slug', type: product_response_dto_1.ProductResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Get)('supplier/:supplierId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all products by a supplier ID' }),
    (0, swagger_1.ApiParam)({ name: 'supplierId', description: 'The unique ID of the supplier', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'A list of products by the specified supplier', type: [product_response_dto_1.ProductResponseDto] }),
    __param(0, (0, common_1.Param)('supplierId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findBySupplierId", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a single product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the product', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The product with the given ID', type: product_response_dto_1.ProductResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER'),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the product', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'The updated product', type: product_response_dto_1.ProductResponseDto }),
    (0, swagger_1.ApiBody)({ type: update_product_dto_1.UpdateProductDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid input or slug already exists' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'SUPPLIER'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a product by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the product', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Product successfully deleted (soft delete)' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id/force'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Permanently delete a product by ID (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the product', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Product permanently deleted' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "forceDelete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Patch)(':id/restore'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Restore a soft deleted product (Admin only)' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'The unique ID of the product', type: 'number' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Product successfully restored', type: product_response_dto_1.ProductResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Deleted product not found' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "restore", null);
exports.ProductsController = ProductsController = __decorate([
    (0, swagger_1.ApiTags)('Products'),
    (0, common_1.Controller)('products'),
    __metadata("design:paramtypes", [products_service_1.ProductsService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map