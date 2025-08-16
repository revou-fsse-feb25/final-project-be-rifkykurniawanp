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
exports.ProductOrdersService = void 0;
const common_1 = require("@nestjs/common");
const product_order_repository_1 = require("./product-order.repository");
let ProductOrdersService = class ProductOrdersService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    create(dto) {
        return this.repository.create(dto);
    }
    findAll() {
        return this.repository.findAll();
    }
    findOne(id) {
        return this.repository.findOne(id);
    }
    update(id, dto) {
        return this.repository.update(id, dto);
    }
    remove(id) {
        return this.repository.remove(id);
    }
};
exports.ProductOrdersService = ProductOrdersService;
exports.ProductOrdersService = ProductOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_order_repository_1.ProductOrdersRepository])
], ProductOrdersService);
//# sourceMappingURL=product-orders.service.js.map