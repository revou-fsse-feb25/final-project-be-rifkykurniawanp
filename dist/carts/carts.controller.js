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
const add_to_cart_dto_1 = require("./dto/request/add-to-cart.dto");
const update_cart_dto_1 = require("./dto/request/update-cart.dto");
const swagger_1 = require("@nestjs/swagger");
const cart_response_dto_1 = require("./dto/response/cart.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CartsController = class CartsController {
    service;
    constructor(service) {
        this.service = service;
    }
    addItem(dto) {
        return this.service.addItem(dto);
    }
    updateItem(cartItemId, dto) {
        return this.service.updateItem(cartItemId, dto);
    }
    getCartByUser(userId) {
        return this.service.getCartByUser(userId);
    }
    removeItem(cartItemId) {
        return this.service.removeItem(cartItemId);
    }
};
exports.CartsController = CartsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Add item to cart' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: cart_response_dto_1.CartResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "addItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Put)(':cartItemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Update cart item' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_response_dto_1.CartResponseDto }),
    __param(0, (0, common_1.Param)('cartItemId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_cart_dto_1.UpdateCartDto]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "updateItem", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Get)(':userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cart by user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: cart_response_dto_1.CartResponseDto }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "getCartByUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Delete)(':cartItemId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remove cart item' }),
    __param(0, (0, common_1.Param)('cartItemId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "removeItem", null);
exports.CartsController = CartsController = __decorate([
    (0, swagger_1.ApiTags)('Carts'),
    (0, common_1.Controller)('carts'),
    __metadata("design:paramtypes", [carts_service_1.CartsService])
], CartsController);
//# sourceMappingURL=carts.controller.js.map