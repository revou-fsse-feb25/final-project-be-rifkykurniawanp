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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesController = void 0;
const common_1 = require("@nestjs/common");
const certificates_service_1 = require("./certificates.service");
const issue_certificate_dto_1 = require("./dto/request/issue-certificate.dto");
const swagger_1 = require("@nestjs/swagger");
const certificate_response_dto_1 = require("./dto/response/certificate.response.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guards/role.guard");
const user_decorator_1 = require("../auth/decorator/user.decorator");
let CertificatesController = class CertificatesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async findAll() {
        return this.service.findAll();
    }
    async findOne(id, user) {
        const certificate = await this.service.findOne(id);
        if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to view this certificate.');
        }
        return certificate;
    }
    async generateCertificate(dto) {
        return this.service.generateCertificate(dto);
    }
    async findByUser(userId, user) {
        if (user.role !== 'ADMIN' && user.id !== userId) {
            throw new common_1.ForbiddenException('You do not have permission to view these certificates.');
        }
        return this.service.findByUser(userId);
    }
    async findByCourse(courseId, user) {
        if (user.role !== 'ADMIN' && user.role !== 'INSTRUCTOR') {
            throw new common_1.ForbiddenException('You do not have permission to view these certificates.');
        }
        return this.service.findByCourse(courseId, user);
    }
    async downloadCertificate(id, user) {
        const certificate = await this.service.findOne(id);
        if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
            throw new common_1.ForbiddenException('You do not have permission to download this certificate.');
        }
        return this.service.downloadPdf(id);
    }
    async verifyEligibility(id) {
        return this.service.verifyEligibility(id);
    }
    async remove(id) {
        return this.service.remove(id);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN: Get all certificates' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_response_dto_1.CertificateResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN/USER: Get certificate by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: certificate_response_dto_1.CertificateResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('generate'),
    (0, swagger_1.ApiOperation)({ summary: 'SYSTEM/INTERNAL: Generate a certificate' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: certificate_response_dto_1.CertificateResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_certificate_dto_1.IssueCertificateDto]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "generateCertificate", null);
__decorate([
    (0, common_1.Get)('users/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN/USER: Get certificates for a specific user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_response_dto_1.CertificateResponseDto] }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "findByUser", null);
__decorate([
    (0, common_1.Get)('courses/:courseId'),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN/INSTRUCTOR: Get certificates for a specific course' }),
    (0, swagger_1.ApiParam)({ name: 'courseId', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_response_dto_1.CertificateResponseDto] }),
    __param(0, (0, common_1.Param)('courseId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "findByCourse", null);
__decorate([
    (0, common_1.Get)(':id/download'),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN/USER: Download certificate as PDF' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Certificate PDF file (mocked)' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "downloadCertificate", null);
__decorate([
    (0, common_1.Put)(':id/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'SYSTEM/INTERNAL: Verify certificate eligibility' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: certificate_response_dto_1.CertificateResponseDto }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "verifyEligibility", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.UseGuards)(role_guard_1.RolesGuard),
    (0, swagger_1.ApiOperation)({ summary: 'ADMIN: Delete certificate' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Certificate deleted successfully' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CertificatesController.prototype, "remove", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Certificates'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard),
    (0, common_1.Controller)('certificates'),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map