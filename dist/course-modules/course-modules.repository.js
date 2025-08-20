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
exports.CourseModulesRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseModulesRepository = class CourseModulesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return await this.prisma.courseModule.create({
            data: {
                title: data.title,
                orderNumber: data.orderNumber,
                courseId: data.courseId,
            },
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: { orderBy: { orderNumber: 'asc' } },
            },
        });
    }
    async findAll() {
        return await this.prisma.courseModule.findMany({
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: { orderBy: { orderNumber: 'asc' } },
            },
            orderBy: [{ courseId: 'asc' }, { orderNumber: 'asc' }],
        });
    }
    async findById(id) {
        return await this.prisma.courseModule.findUnique({
            where: { id },
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: { orderBy: { orderNumber: 'asc' } },
            },
        });
    }
    async findByCourseId(courseId) {
        return await this.prisma.courseModule.findMany({
            where: { courseId },
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: { orderBy: { orderNumber: 'asc' } },
            },
            orderBy: { orderNumber: 'asc' },
        });
    }
    async update(id, data) {
        return await this.prisma.courseModule.update({
            where: { id },
            data,
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: { orderBy: { orderNumber: 'asc' } },
            },
        });
    }
    async delete(id) {
        await this.prisma.courseModule.delete({ where: { id } });
    }
    async findByIdWithLessons(id) {
        return await this.prisma.courseModule.findUnique({
            where: { id },
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: {
                    orderBy: { orderNumber: 'asc' },
                    include: { progresses: true, assignments: true },
                },
            },
        });
    }
    async findByCourseIdWithLessons(courseId) {
        return await this.prisma.courseModule.findMany({
            where: { courseId },
            include: {
                course: { select: { id: true, title: true, instructorId: true } },
                lessons: {
                    orderBy: { orderNumber: 'asc' },
                    include: { progresses: true, assignments: true },
                },
            },
            orderBy: { orderNumber: 'asc' },
        });
    }
    async checkCourseExists(courseId) {
        const course = await this.prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
        return !!course;
    }
    async checkModuleOwnership(moduleId, instructorId) {
        const module = await this.prisma.courseModule.findUnique({
            where: { id: moduleId },
            include: { course: { select: { instructorId: true } } },
        });
        return module?.course.instructorId === instructorId;
    }
};
exports.CourseModulesRepository = CourseModulesRepository;
exports.CourseModulesRepository = CourseModulesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseModulesRepository);
//# sourceMappingURL=course-modules.repository.js.map