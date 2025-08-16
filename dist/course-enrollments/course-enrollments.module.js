"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseEnrollmentsModule = void 0;
const common_1 = require("@nestjs/common");
const course_enrollments_service_1 = require("./course-enrollments.service");
const course_enrollments_controller_1 = require("./course-enrollments.controller");
const course_enrollments_repository_1 = require("./course-enrollments.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseEnrollmentsModule = class CourseEnrollmentsModule {
};
exports.CourseEnrollmentsModule = CourseEnrollmentsModule;
exports.CourseEnrollmentsModule = CourseEnrollmentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [course_enrollments_controller_1.CourseEnrollmentsController],
        providers: [course_enrollments_service_1.CourseEnrollmentsService, course_enrollments_repository_1.CourseEnrollmentsRepository, prisma_service_1.PrismaService],
        exports: [course_enrollments_service_1.CourseEnrollmentsService],
    })
], CourseEnrollmentsModule);
//# sourceMappingURL=course-enrollments.module.js.map