"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOrdersModule = void 0;
const common_1 = require("@nestjs/common");
const product_orders_service_1 = require("./product-orders.service");
const product_orders_controller_1 = require("./product-orders.controller");
const product_order_repository_1 = require("./product-order.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductOrdersModule = class ProductOrdersModule {
};
exports.ProductOrdersModule = ProductOrdersModule;
exports.ProductOrdersModule = ProductOrdersModule = __decorate([
    (0, common_1.Module)({
        controllers: [product_orders_controller_1.ProductOrdersController],
        providers: [product_orders_service_1.ProductOrdersService, product_order_repository_1.ProductOrdersRepository, prisma_service_1.PrismaService],
        exports: [product_orders_service_1.ProductOrdersService],
    })
], ProductOrdersModule);
//# sourceMappingURL=product-orders.module.js.map