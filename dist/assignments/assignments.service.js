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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentsService = class AssignmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, userId, role) {
        if (!['ADMIN', 'INSTRUCTOR'].includes(role)) {
            throw new common_1.ForbiddenException('Access denied');
        }
        const lesson = await this.prisma.lesson.findUnique({
            where: { id: dto.lessonId },
            include: { module: { include: { course: true } } },
        });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        const assignment = await this.prisma.assignment.create({
            data: { ...dto },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return this.mapAssignment(assignment);
    }
    async findAll(page, limit, role) {
        const skip = (page - 1) * limit;
        const assignments = await this.prisma.assignment.findMany({
            where: { deletedAt: null },
            skip,
            take: limit,
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return assignments.map(this.mapAssignment);
    }
    async getDeleted(page, limit, role) {
        if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Access denied');
        const skip = (page - 1) * limit;
        const assignments = await this.prisma.assignment.findMany({
            where: { NOT: { deletedAt: null } },
            skip,
            take: limit,
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return assignments.map(this.mapAssignment);
    }
    async findByLesson(lessonId, userId, role) {
        const assignments = await this.prisma.assignment.findMany({
            where: { lessonId, deletedAt: null },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return assignments.map(this.mapAssignment);
    }
    async findByCourse(courseId, userId, role) {
        const assignments = await this.prisma.assignment.findMany({
            where: {
                lesson: { module: { courseId } },
                deletedAt: null,
            },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return assignments.map(this.mapAssignment);
    }
    async findOne(id, userId, role) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        if (!assignment || assignment.deletedAt)
            throw new common_1.NotFoundException('Assignment not found');
        return this.mapAssignment(assignment);
    }
    async update(id, dto, userId, role) {
        const assignment = await this.prisma.assignment.findUnique({ where: { id } });
        if (!assignment || assignment.deletedAt)
            throw new common_1.NotFoundException('Assignment not found');
        const updated = await this.prisma.assignment.update({
            where: { id },
            data: { ...dto },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        return this.mapAssignment(updated);
    }
    async remove(id, userId, role) {
        const assignment = await this.prisma.assignment.findUnique({ where: { id } });
        if (!assignment || assignment.deletedAt)
            throw new common_1.NotFoundException('Assignment not found');
        await this.prisma.assignment.update({ where: { id }, data: { deletedAt: new Date() } });
        return { message: 'Assignment soft deleted successfully' };
    }
    async forceDelete(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Access denied');
        await this.prisma.assignment.delete({ where: { id } });
        return { message: 'Assignment permanently deleted' };
    }
    async restore(id, role) {
        if (role !== 'ADMIN')
            throw new common_1.ForbiddenException('Access denied');
        const assignment = await this.prisma.assignment.findUnique({ where: { id } });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        await this.prisma.assignment.update({ where: { id }, data: { deletedAt: null } });
        return this.mapAssignment({ ...assignment, deletedAt: null });
    }
    async createSubmission(dto, userId, role) {
        const submission = await this.prisma.assignmentSubmission.create({
            data: { ...dto, userId },
            include: {
                assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
                user: true,
            },
        });
        return this.mapSubmission(submission);
    }
    async findSubmissionsByAssignment(assignmentId, userId, role) {
        const submissions = await this.prisma.assignmentSubmission.findMany({
            where: { assignmentId },
            include: {
                assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
                user: true,
            },
        });
        return submissions.map(this.mapSubmission);
    }
    async findSubmissionsByUser(targetUserId, userId, role) {
        const submissions = await this.prisma.assignmentSubmission.findMany({
            where: { userId: targetUserId },
            include: {
                assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
                user: true,
            },
        });
        return submissions.map(this.mapSubmission);
    }
    async updateSubmission(id, dto, userId, role) {
        const submission = await this.prisma.assignmentSubmission.findUnique({ where: { id } });
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        const updated = await this.prisma.assignmentSubmission.update({
            where: { id },
            data: { ...dto },
            include: {
                assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
                user: true,
            },
        });
        return this.mapSubmission(updated);
    }
    async removeSubmission(id, userId, role) {
        const submission = await this.prisma.assignmentSubmission.findUnique({ where: { id } });
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        await this.prisma.assignmentSubmission.delete({ where: { id } });
        return { message: 'Submission deleted successfully' };
    }
    mapAssignment(a) {
        if (!a.lesson)
            throw new common_1.NotFoundException('Lesson not found in assignment');
        if (!a.lesson.module)
            throw new common_1.NotFoundException('Module not found in lesson');
        if (!a.lesson.module.course)
            throw new common_1.NotFoundException('Course not found in module');
        return {
            id: a.id,
            lessonId: a.lessonId,
            title: a.title,
            instructions: a.instructions,
            dueDate: a.dueDate ?? undefined,
            createdAt: a.createdAt,
            lesson: {
                id: a.lesson.id,
                title: a.lesson.title,
                slug: a.lesson.slug ?? undefined,
                type: a.lesson.type,
                module: {
                    id: a.lesson.module.id,
                    title: a.lesson.module.title,
                    course: {
                        id: a.lesson.module.course.id,
                        title: a.lesson.module.course.title,
                        slug: a.lesson.module.course.slug,
                        instructorId: a.lesson.module.course.instructorId,
                    },
                },
            },
            submissionCount: a.submissions?.length || 0,
            gradedSubmissionCount: a.submissions?.filter((s) => s.grade != null).length || 0,
        };
    }
    mapSubmission(s) {
        if (!s.assignment)
            throw new common_1.NotFoundException('Assignment not found');
        if (!s.assignment.lesson)
            throw new common_1.NotFoundException('Lesson not found in assignment');
        if (!s.assignment.lesson.module)
            throw new common_1.NotFoundException('Module not found in lesson');
        if (!s.assignment.lesson.module.course)
            throw new common_1.NotFoundException('Course not found in module');
        return {
            id: s.id,
            assignmentId: s.assignmentId,
            userId: s.userId,
            content: s.content ?? undefined,
            grade: s.grade?.toNumber?.() ?? undefined,
            submittedAt: s.submittedAt,
            user: s.user
                ? {
                    id: s.user.id,
                    email: s.user.email,
                    firstName: s.user.firstName ?? undefined,
                    lastName: s.user.lastName ?? undefined,
                }
                : undefined,
            assignment: {
                id: s.assignment.id,
                title: s.assignment.title,
                dueDate: s.assignment.dueDate ?? undefined,
                lesson: {
                    id: s.assignment.lesson.id,
                    title: s.assignment.lesson.title,
                    module: {
                        id: s.assignment.lesson.module.id,
                        title: s.assignment.lesson.module.title,
                        course: {
                            id: s.assignment.lesson.module.course.id,
                            title: s.assignment.lesson.module.course.title,
                        },
                    },
                },
            },
        };
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map