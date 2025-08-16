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
exports.CartsService = void 0;
const common_1 = require("@nestjs/common");
const carts_repository_1 = require("./carts.repository");
let CartsService = class CartsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    addItem(dto) {
        return this.repository.addItem(dto);
    }
    updateItem(cartItemId, dto) {
        return this.repository.updateItem(cartItemId, dto);
    }
    getCartByUser(userId) {
        return this.repository.getCartByUser(userId);
    }
    removeItem(cartItemId) {
        return this.repository.removeItem(cartItemId);
    }
};
exports.CartsService = CartsService;
exports.CartsService = CartsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [carts_repository_1.CartsRepository])
], CartsService);
//# sourceMappingURL=carts.service.js.map