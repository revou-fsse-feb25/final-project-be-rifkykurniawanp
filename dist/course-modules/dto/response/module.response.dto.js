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
const course_response_dto_1 = require("./course.response.dto");
const lesson_response_dto_1 = require("./lesson.response.dto");
class ModuleResponseDto {
    id;
    courseId;
    title;
    orderNumber;
    course;
    lessons;
}
exports.ModuleResponseDto = ModuleResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Module ID',
        example: 1,
    }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Course ID that this module belongs to',
        example: 1,
    }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the course module',
        example: 'Introduction to Coffee Brewing',
    }),
    __metadata("design:type", String)
], ModuleResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Order number of the module in the course',
        example: 1,
    }),
    __metadata("design:type", Number)
], ModuleResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => course_response_dto_1.CourseResponseDto }),
    __metadata("design:type", course_response_dto_1.CourseResponseDto)
], ModuleResponseDto.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => [lesson_response_dto_1.ModuleLessonResponseDto] }),
    __metadata("design:type", Array)
], ModuleResponseDto.prototype, "lessons", void 0);
//# sourceMappingURL=module.response.dto.js.map