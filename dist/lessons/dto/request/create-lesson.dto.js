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
exports.CreateLessonDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateLessonDto {
    moduleId;
    slug;
    title;
    description;
    duration;
    type;
    videoUrl;
    content;
    quizQuestions;
    passingScore;
    orderNumber;
}
exports.CreateLessonDto = CreateLessonDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID of the course module' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'intro-to-brewing', description: 'Slug of the lesson', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Brewing' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Learn the basics of coffee brewing', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10m', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.LessonType, example: client_1.LessonType.VIDEO }),
    (0, class_validator_1.IsEnum)(client_1.LessonType),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://video.url/lesson.mp4', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lesson content here', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[]', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLessonDto.prototype, "quizQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 70 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDecimal)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "passingScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateLessonDto.prototype, "orderNumber", void 0);
//# sourceMappingURL=create-lesson.dto.js.map