"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const edge_1 = require("@prisma/client/edge");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
exports.prisma = new edge_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
//# sourceMappingURL=prisma.js.map