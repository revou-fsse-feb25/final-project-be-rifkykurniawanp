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
exports.CourseModuleResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const lesson_response_dto_1 = require("../../../lessons/dto/response/lesson.response.dto");
class CourseModuleResponseDto {
    id;
    title;
    orderNumber;
    courseId;
    lessons;
    createdAt;
    deletedAt;
}
exports.CourseModuleResponseDto = CourseModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID of the course module' }),
    __metadata("design:type", Number)
], CourseModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Title of the module' }),
    __metadata("design:type", String)
], CourseModuleResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Order number of the module' }),
    __metadata("design:type", Number)
], CourseModuleResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Associated course ID' }),
    __metadata("design:type", Number)
], CourseModuleResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'List of lessons in the module', type: [lesson_response_dto_1.LessonResponseDto] }),
    __metadata("design:type", Array)
], CourseModuleResponseDto.prototype, "lessons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at timestamp' }),
    __metadata("design:type", Date)
], CourseModuleResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Soft delete timestamp', required: false, nullable: true }),
    __metadata("design:type", Object)
], CourseModuleResponseDto.prototype, "deletedAt", void 0);
//# sourceMappingURL=course-module.response.dto.js.map