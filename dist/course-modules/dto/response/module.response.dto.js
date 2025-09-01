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
exports.ModuleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CourseInfoDto {
    id;
    title;
    instructorId;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course ID', example: 1 }),
    __metadata("design:type", Number)
], CourseInfoDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course title', example: 'Complete Coffee Brewing Course' }),
    __metadata("design:type", String)
], CourseInfoDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Instructor ID', example: 2 }),
    __metadata("design:type", Number)
], CourseInfoDto.prototype, "instructorId", void 0);
class LessonDto {
    id;
    slug;
    title;
    description;
    duration;
    type;
    orderNumber;
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson ID', example: 1 }),
    __metadata("design:type", Number)
], LessonDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson slug', example: 'introduction-to-arabica' }),
    __metadata("design:type", String)
], LessonDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson title', example: 'Introduction to Arabica Coffee' }),
    __metadata("design:type", String)
], LessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson description', example: 'Learn about Arabica coffee varieties' }),
    __metadata("design:type", String)
], LessonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson duration', example: '15 minutes' }),
    __metadata("design:type", String)
], LessonDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lesson type', enum: ['VIDEO', 'ARTICLE', 'QUIZ', 'ASSIGNMENT'] }),
    __metadata("design:type", String)
], LessonDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order number', example: 1 }),
    __metadata("design:type", Number)
], LessonDto.prototype, "orderNumber", void 0);
class ModuleResponseDto {
    id;
    courseId;
    title;
    orderNumber;
    course;
    lessons;
    createdAt;
}
exports.ModuleResponseDto = ModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module ID', example: 1 }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course ID', example: 1 }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module title', example: 'Introduction to Coffee Brewing' }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order number', example: 1 }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Course information', type: CourseInfoDto }),
    __metadata("design:type", CourseInfoDto)
], ModuleResponseDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Module lessons', type: [LessonDto] }),
    __metadata("design:type", Array)
], ModuleResponseDto.prototype, "lessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Creation timestamp', example: '2025-01-15T10:30:00Z' }),
    __metadata("design:type", Date)
], ModuleResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=module.response.dto.js.map