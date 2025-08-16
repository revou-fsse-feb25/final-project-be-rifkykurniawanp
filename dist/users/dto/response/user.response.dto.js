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
exports.UserResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class UserResponseDto {
    id;
    email;
    firstName;
    lastName;
    phone;
    address;
    role;
    isBuyer;
    isStudent;
    createdAt;
}
exports.UserResponseDto = UserResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1 }),
    __metadata("design:type", Number)
], UserResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user@example.com' }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '+6281234567890', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jl. Sudirman No.1', required: false }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.RoleName, example: client_1.RoleName.USER }),
    __metadata("design:type", String)
], UserResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isBuyer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    __metadata("design:type", Boolean)
], UserResponseDto.prototype, "isStudent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-08-15T10:00:00Z' }),
    __metadata("design:type", Date)
], UserResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=user.response.dto.js.map