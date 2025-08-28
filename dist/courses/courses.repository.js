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
exports.CoursesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CoursesRepository = class CoursesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.course.create({
            data: {
                ...data,
            },
            include: {
                instructor: true,
                modules: { include: { lessons: true } },
                enrollments: true,
                cartItems: true,
            },
        });
    }
    async findAll(skip, take, filter) {
        return this.prisma.course.findMany({
            skip,
            take,
            where: { ...filter },
            orderBy: { createdAt: 'desc' },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async findById(id, filter) {
        return this.prisma.course.findFirst({
            where: { id, ...filter },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async findBySlug(slug, filter) {
        return this.prisma.course.findFirst({
            where: { slug, ...filter },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async findByInstructorId(instructorId, filter) {
        return this.prisma.course.findMany({
            where: { instructorId, ...filter },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async update(id, data) {
        return this.prisma.course.update({
            where: { id },
            data,
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async softDelete(id) {
        await this.prisma.course.update({ where: { id }, data: { deletedAt: new Date() } });
    }
    async hardDelete(id) {
        await this.prisma.course.delete({ where: { id } });
    }
    async restore(id) {
        return this.prisma.course.update({
            where: { id },
            data: { deletedAt: null },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async findBySlugIncludingDeleted(slug) {
        return this.prisma.course.findFirst({
            where: { slug },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: { instructor: true, modules: { include: { lessons: true } }, enrollments: true, cartItems: true },
        });
    }
};
exports.CoursesRepository = CoursesRepository;
exports.CoursesRepository = CoursesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesRepository);
//# sourceMappingURL=courses.repository.js.map