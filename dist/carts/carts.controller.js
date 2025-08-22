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
exports.CartsController = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const create_cart_dto_1 = require("./dto/request/create-cart.dto");
const update_cart_dto_1 = require("./dto/request/update-cart.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const role_guard_1 = require("../auth/guards/role.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
let CartsController = class CartsController {
    cartsService;
    constructor(cartsService) {
        this.cartsService = cartsService;
    }
    async create(req, dto) {
        const { user } = req;
        return this.cartsService.create(user.id, dto, user.role);
    }
    async findAll(req, page = '1', limit = '10') {
        const { user } = req;
        return this.cartsService.findAll(user.id, user.role);
    }
    async findOne(id, req) {
        const { user } = req;
        return this.cartsService.findOne(id, user.id, user.role);
    }
    async update(id, dto, req) {
        const { user } = req;
        return this.cartsService.update(id, dto, user.id, user.role);
    }
    async remove(id, req) {
        const { user } = req;
        return this.cartsService.remove(id, user.id, user.role);
    }
    async addItem(cartId, body, req) {
        const { user } = req;
        return this.cartsService.addItem(cartId, user.id, body.itemType, body.itemId, body.quantity, user.role);
    }
    async removeItem(cartId, itemId, req) {
        const { user } = req;
        return this.cartsService.removeItem(cartId, user.id, itemId, user.role);
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_cart_dto_1.CreateCartDto]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cart_dto_1.UpdateCartDto, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Post)(':id/items'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "addItem", null);
__decorate([
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('USER', 'ADMIN'),
    (0, common_1.Delete)(':id/items/:itemId'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('itemId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CartsController.prototype, "removeItem", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Controller)('carts'),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map