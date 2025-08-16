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
exports.CourseEnrollmentsService = void 0;
const common_1 = require("@nestjs/common");
const course_enrollments_repository_1 = require("./course-enrollments.repository");
let CourseEnrollmentsService = class CourseEnrollmentsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    enroll(dto, paymentId) {
        return this.repository.enroll({ ...dto, paymentId });
    }
    findAll() {
        return this.repository.findAll();
    }
    findOne(id) {
        return this.repository.findOne(id);
    }
    update(id, dto) {
        return this.repository.update(id, dto);
    }
    remove(id) {
        return this.repository.remove(id);
    }
};
exports.CourseEnrollmentsService = CourseEnrollmentsService;
exports.CourseEnrollmentsService = CourseEnrollmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_enrollments_repository_1.CourseEnrollmentsRepository])
], CourseEnrollmentsService);
//# sourceMappingURL=course-enrollments.service.js.map