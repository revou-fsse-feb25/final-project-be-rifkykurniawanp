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
exports.CourseResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const instructor_response_dto_1 = require("./instructor.response.dto");
class CourseResponseDto {
    id;
    title;
    slug;
    description;
    syllabus;
    price;
    rating;
    students;
    duration;
    level;
    category;
    language;
    certificate;
    createdAt;
    instructor;
    modules;
    enrollments;
}
exports.CourseResponseDto = CourseResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CourseResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "syllabus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CourseResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CourseResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CourseResponseDto.prototype, "students", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CourseLevel }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "level", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.CourseCategory }),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CourseResponseDto.prototype, "language", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], CourseResponseDto.prototype, "certificate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], CourseResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => instructor_response_dto_1.InstructorResponseDto }),
    __metadata("design:type", instructor_response_dto_1.InstructorResponseDto)
], CourseResponseDto.prototype, "instructor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Object],
    }),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "modules", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: [Object],
    }),
    __metadata("design:type", Array)
], CourseResponseDto.prototype, "enrollments", void 0);
//# sourceMappingURL=course.response.dto.js.map