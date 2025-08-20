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
exports.CreateAssignmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAssignmentDto {
    title;
    instructions;
    dueDate;
    lessonId;
}
exports.CreateAssignmentDto = CreateAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Essay on Climate Change', maxLength: 200 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 200),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Write a 2000-word essay about global warming', maxLength: 2000 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(1, 2000),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "instructions", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2025-09-01T23:59:59Z', description: 'Due date in ISO format' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "dueDate", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "lessonId", void 0);
//# sourceMappingURL=create-assignment.dto.js.map