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
let CertificatesController = class CertificatesController {
    service;
    constructor(service) {
        this.service = service;
    }
    issue(dto) {
        return this.service.issue(dto);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.CertificatesController = CertificatesController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN', 'INSTRUCTOR'),
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Issue certificate' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: certificate_response_dto_1.CertificateResponseDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [issue_certificate_dto_1.IssueCertificateDto]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "issue", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all certificates' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: [certificate_response_dto_1.CertificateResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get certificate by id' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: certificate_response_dto_1.CertificateResponseDto }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete certificate' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CertificatesController.prototype, "remove", null);
exports.CertificatesController = CertificatesController = __decorate([
    (0, swagger_1.ApiTags)('Certificates'),
    (0, common_1.Controller)('certificates'),
    __metadata("design:paramtypes", [certificates_service_1.CertificatesService])
], CertificatesController);
//# sourceMappingURL=certificates.controller.js.map