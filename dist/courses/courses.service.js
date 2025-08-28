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
exports.CoursesService = void 0;
const common_1 = require("@nestjs/common");
const courses_repository_1 = require("./courses.repository");
let CoursesService = class CoursesService {
    coursesRepository;
    constructor(coursesRepository) {
        this.coursesRepository = coursesRepository;
    }
    async create(dto, userId, role) {
        const exists = await this.coursesRepository.findBySlugIncludingDeleted(dto.slug);
        if (exists && !exists.deletedAt)
            throw new common_1.BadRequestException('Course slug already exists');
        let instructorId = dto.instructorId;
        if (role === 'INSTRUCTOR')
            instructorId = userId;
        else if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Only ADMIN and INSTRUCTOR can create courses');
        const course = await this.coursesRepository.create({ ...dto, instructorId });
        return this.toResponseDto(course);
    }
    async findAll(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const courses = await this.coursesRepository.findAll(skip, limit, { deletedAt: null });
        return courses.map(c => this.toResponseDto(c));
    }
    async findOne(id) {
        const course = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.toResponseDto(course);
    }
    async findBySlug(slug) {
        const course = await this.coursesRepository.findBySlug(slug, { deletedAt: null });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return this.toResponseDto(course);
    }
    async findByInstructorId(instructorId) {
        const courses = await this.coursesRepository.findByInstructorId(instructorId, { deletedAt: null });
        return courses.map(c => this.toResponseDto(c));
    }
    async update(id, dto, userId, role) {
        const course = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (role === 'INSTRUCTOR' && course.instructorId !== userId)
            throw new common_1.ForbiddenException('Cannot update other instructors');
        if (dto.slug && dto.slug !== course.slug) {
            const slugExists = await this.coursesRepository.findBySlug(dto.slug, { deletedAt: null });
            if (slugExists)
                throw new common_1.BadRequestException('Course slug already exists');
        }
        const updated = await this.coursesRepository.update(id, dto);
        return this.toResponseDto(updated);
    }
    async remove(id, userId, role) {
        const course = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        if (role === 'INSTRUCTOR' && course.instructorId !== userId)
            throw new common_1.ForbiddenException('Cannot delete other instructors');
        await this.coursesRepository.softDelete(id);
    }
    async forceDelete(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Only ADMIN can delete');
        const course = await this.coursesRepository.findByIdIncludingDeleted(id);
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        await this.coursesRepository.hardDelete(id);
    }
    async restore(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Only ADMIN can restore');
        const course = await this.coursesRepository.findByIdIncludingDeleted(id);
        if (!course || !course.deletedAt)
            throw new common_1.NotFoundException('Deleted course not found');
        const restored = await this.coursesRepository.restore(id);
        return this.toResponseDto(restored);
    }
    toResponseDto(course) {
        return {
            id: course.id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            syllabus: course.syllabus,
            price: Number(course.price),
            rating: Number(course.rating ?? 0),
            students: course.students ?? 0,
            duration: course.duration,
            level: course.level,
            category: course.category,
            language: course.language,
            certificate: course.certificate,
            createdAt: course.createdAt,
            instructor: course.instructor,
            modules: course.modules?.map((m) => ({
                id: m.id,
                title: m.title,
                orderNumber: m.orderNumber,
                lessons: m.lessons?.map((l) => ({
                    id: l.id,
                    slug: l.slug,
                    title: l.title,
                    description: l.description,
                    duration: l.duration,
                    type: l.type,
                    videoUrl: l.videoUrl,
                    content: l.content,
                    quizQuestions: l.quizQuestions,
                    passingScore: Number(l.passingScore ?? 0),
                    orderNumber: l.orderNumber,
                })),
            })),
            enrollments: course.enrollments,
        };
    }
};
exports.CoursesService = CoursesService;
exports.CoursesService = CoursesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [courses_repository_1.CoursesRepository])
], CoursesService);
//# sourceMappingURL=courses.service.js.map