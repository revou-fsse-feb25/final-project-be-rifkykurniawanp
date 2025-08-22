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
    async create(createCourseDto, currentUserId, currentUserRole) {
        const existingCourse = await this.coursesRepository.findBySlugIncludingDeleted(createCourseDto.slug);
        if (existingCourse && !existingCourse.deletedAt) {
            throw new common_1.BadRequestException('Course slug already exists');
        }
        let instructorId = createCourseDto.instructorId;
        if (currentUserRole === 'INSTRUCTOR') {
            instructorId = currentUserId;
        }
        else if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN and INSTRUCTOR can create courses');
        }
        const course = await this.coursesRepository.create({
            ...createCourseDto,
            instructorId,
        });
        return this.toResponseDto(course);
    }
    async findAll(page = 1, limit = 10, filter) {
        const skip = (page - 1) * limit;
        const courses = await this.coursesRepository.findAll(skip, limit, {
            ...filter,
            deletedAt: null
        });
        return courses.map(course => this.toResponseDto(course));
    }
    async findOne(id) {
        const course = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return this.toResponseDto(course);
    }
    async findBySlug(slug) {
        const course = await this.coursesRepository.findBySlug(slug, { deletedAt: null });
        if (!course) {
            throw new common_1.NotFoundException('Course not found');
        }
        return this.toResponseDto(course);
    }
    async findByInstructorId(instructorId) {
        const courses = await this.coursesRepository.findByInstructorId(instructorId, { deletedAt: null });
        return courses.map(course => this.toResponseDto(course));
    }
    async update(id, updateCourseDto, currentUserId, currentUserRole) {
        const existingCourse = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!existingCourse) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (currentUserRole === 'INSTRUCTOR' && existingCourse.instructorId !== currentUserId) {
            throw new common_1.ForbiddenException('You can only update your own courses');
        }
        else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'INSTRUCTOR') {
            throw new common_1.ForbiddenException('Only ADMIN and INSTRUCTOR can update courses');
        }
        if (updateCourseDto.slug && updateCourseDto.slug !== existingCourse.slug) {
            const slugExists = await this.coursesRepository.findBySlug(updateCourseDto.slug, { deletedAt: null });
            if (slugExists) {
                throw new common_1.BadRequestException('Course slug already exists');
            }
        }
        const course = await this.coursesRepository.update(id, updateCourseDto);
        return this.toResponseDto(course);
    }
    async remove(id, currentUserId, currentUserRole) {
        const existingCourse = await this.coursesRepository.findById(id, { deletedAt: null });
        if (!existingCourse) {
            throw new common_1.NotFoundException('Course not found');
        }
        if (currentUserRole === 'INSTRUCTOR' && existingCourse.instructorId !== currentUserId) {
            throw new common_1.ForbiddenException('You can only delete your own courses');
        }
        else if (currentUserRole !== 'ADMIN' && currentUserRole !== 'INSTRUCTOR') {
            throw new common_1.ForbiddenException('Only ADMIN and INSTRUCTOR can delete courses');
        }
        await this.coursesRepository.softDelete(id);
    }
    async forceDelete(id, currentUserRole) {
        if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN can permanently delete courses');
        }
        const existingCourse = await this.coursesRepository.findByIdIncludingDeleted(id);
        if (!existingCourse) {
            throw new common_1.NotFoundException('Course not found');
        }
        await this.coursesRepository.hardDelete(id);
    }
    async restore(id, currentUserRole) {
        if (currentUserRole !== 'ADMIN') {
            throw new common_1.ForbiddenException('Only ADMIN can restore courses');
        }
        const course = await this.coursesRepository.findByIdIncludingDeleted(id);
        if (!course || !course.deletedAt) {
            throw new common_1.NotFoundException('Deleted course not found');
        }
        const restoredCourse = await this.coursesRepository.restore(id);
        return this.toResponseDto(restoredCourse);
    }
    toResponseDto(course) {
        return {
            id: course.id,
            title: course.title,
            slug: course.slug,
            description: course.description,
            syllabus: course.syllabus,
            price: Number(course.price),
            rating: Number(course.rating),
            students: course.students,
            duration: course.duration,
            level: course.level,
            category: course.category,
            language: course.language,
            certificate: course.certificate,
            createdAt: course.createdAt,
            instructor: course.instructor,
            modules: course.modules,
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