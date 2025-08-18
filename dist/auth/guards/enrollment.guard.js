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
exports.EnrollmentGuard = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let EnrollmentGuard = class EnrollmentGuard {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const lessonId = request.params.lessonId;
        const assignmentId = request.params.id;
        if (user.role === 'ADMIN') {
            return true;
        }
        let courseId = null;
        if (lessonId) {
            const lesson = await this.prisma.lesson.findUnique({
                where: { id: parseInt(lessonId) },
                include: {
                    module: {
                        include: { course: true },
                    },
                },
            });
            if (!lesson) {
                throw new common_1.ForbiddenException('Lesson not found');
            }
            courseId = lesson.module.courseId;
            if (user.role === 'INSTRUCTOR' &&
                lesson.module.course.instructorId === user.id) {
                return true;
            }
        }
        if (assignmentId) {
            const assignment = await this.prisma.assignment.findUnique({
                where: { id: parseInt(assignmentId) },
                include: {
                    lesson: {
                        include: {
                            module: {
                                include: { course: true },
                            },
                        },
                    },
                },
            });
            if (!assignment) {
                throw new common_1.ForbiddenException('Assignment not found');
            }
            courseId = assignment.lesson.module.courseId;
            if (user.role === 'INSTRUCTOR' &&
                assignment.lesson.module.course.instructorId === user.id) {
                return true;
            }
        }
        if (user.role === 'USER') {
            if (!courseId) {
                throw new common_1.ForbiddenException('CourseId could not be determined. Please provide lessonId or assignmentId.');
            }
            const enrollment = await this.prisma.courseEnrollment.findFirst({
                where: {
                    courseId,
                    studentId: user.id,
                },
            });
            if (!enrollment) {
                throw new common_1.ForbiddenException('You must be enrolled in this course to access this content');
            }
            return true;
        }
        return false;
    }
};
exports.EnrollmentGuard = EnrollmentGuard;
exports.EnrollmentGuard = EnrollmentGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnrollmentGuard);
//# sourceMappingURL=enrollment.guard.js.map