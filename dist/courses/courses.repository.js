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
const courses_constants_1 = require("./constants/courses.constants");
let CoursesRepository = class CoursesRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.course.create({
            data,
            include: courses_constants_1.COURSE_INCLUDE_WITH_MODULES,
        });
    }
    async findById(id) {
        return this.prisma.course.findUnique({
            where: { id },
            include: courses_constants_1.COURSE_INCLUDE_FULL,
        });
    }
    async findBySlug(slug) {
        return this.prisma.course.findUnique({
            where: { slug },
            include: courses_constants_1.COURSE_INCLUDE_WITH_MODULES,
        });
    }
    async findAll(skip = 0, take = 10, filter) {
        return this.prisma.course.findMany({
            where: (0, courses_constants_1.buildCourseWhere)(filter),
            skip,
            take,
            include: courses_constants_1.COURSE_INCLUDE_BASIC,
            orderBy: courses_constants_1.ORDER_BY_CREATED_DESC,
        });
    }
    async update(id, data) {
        return this.prisma.course.update({
            where: { id },
            data,
            include: courses_constants_1.COURSE_INCLUDE_WITH_MODULES,
        });
    }
    async delete(id) {
        return this.prisma.course.delete({ where: { id } });
    }
    async updateRating(id, rating) {
        return this.prisma.course.update({
            where: { id },
            data: { rating },
        });
    }
    async incrementStudentCount(id) {
        return this.prisma.course.update({
            where: { id },
            data: { students: { increment: 1 } },
        });
    }
    async findByInstructorId(instructorId) {
        return this.prisma.course.findMany({
            where: { instructorId },
            include: courses_constants_1.COURSE_INCLUDE_WITH_MODULES,
            orderBy: courses_constants_1.ORDER_BY_CREATED_DESC,
        });
    }
};
exports.CoursesRepository = CoursesRepository;
exports.CoursesRepository = CoursesRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CoursesRepository);
//# sourceMappingURL=courses.repository.js.map