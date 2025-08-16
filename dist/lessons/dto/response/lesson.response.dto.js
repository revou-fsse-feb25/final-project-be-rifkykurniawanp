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
exports.LessonResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class LessonResponseDto {
    id;
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
    createdAt;
}
exports.LessonResponseDto = LessonResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "moduleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'intro-to-brewing', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Introduction to Brewing' }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Learn the basics of coffee brewing', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '10m', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.LessonType }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'https://video.url/lesson.mp4', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "videoUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lesson content here', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '[]', required: false }),
    __metadata("design:type", String)
], LessonResponseDto.prototype, "quizQuestions", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 70 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "passingScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], LessonResponseDto.prototype, "orderNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T12:00:00Z' }),
    __metadata("design:type", Date)
], LessonResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=lesson.response.dto.js.map