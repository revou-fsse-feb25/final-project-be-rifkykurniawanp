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
exports.AssignmentSubmissionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const assignment_submissions_repository_1 = require("./assignment-submissions.repository");
let AssignmentSubmissionService = class AssignmentSubmissionService {
    submissionRepository;
    prisma;
    constructor(submissionRepository, prisma) {
        this.submissionRepository = submissionRepository;
        this.prisma = prisma;
    }
    async submitAssignment(assignmentId, createSubmissionDto, userId) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: {
                lesson: { include: { module: { include: { course: true } } } }
            },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        const enrollment = await this.prisma.courseEnrollment.findFirst({
            where: {
                courseId: assignment.lesson.module.courseId,
                studentId: userId,
            },
        });
        if (!enrollment)
            throw new common_1.ForbiddenException('You must be enrolled in this course');
        const existingSubmission = await this.submissionRepository.userHasSubmission(assignmentId, userId);
        if (existingSubmission)
            throw new common_1.ConflictException('You have already submitted this assignment');
        if (assignment.dueDate && assignment.dueDate < new Date()) {
            throw new common_1.BadRequestException('Assignment submission deadline has passed');
        }
        const submission = await this.submissionRepository.create(assignmentId, userId, createSubmissionDto);
        return this.mapSubmissionToResponse(submission);
    }
    async getAssignmentSubmissions(assignmentId, userId, userRole, page = 1, limit = 20, graded, filterUserId) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        if (userRole !== 'ADMIN' && assignment.lesson.module.course.instructorId !== userId) {
            throw new common_1.ForbiddenException('You can only view submissions for your own courses');
        }
        const filters = { graded, userId: filterUserId };
        const { submissions, total } = await this.submissionRepository.findByAssignmentId(assignmentId, filters, { page, limit });
        const stats = await this.submissionRepository.getSubmissionStats(assignmentId);
        return {
            submissions: submissions.map(this.mapSubmissionToResponse),
            total,
            page,
            limit,
            stats: {
                totalSubmissions: stats.totalSubmissions,
                gradedSubmissions: stats.gradedSubmissions,
                averageGrade: stats.averageGrade,
            },
        };
    }
    async getSubmissionById(submissionId, userId, userRole) {
        const submission = await this.submissionRepository.findByIdWithRelations(submissionId);
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        if (userRole !== 'ADMIN' && !(userRole === 'USER' && submission.userId === userId)) {
            const submissionWithCourse = await this.submissionRepository.getSubmissionWithCourse(submissionId);
            if (!submissionWithCourse || submissionWithCourse.assignment.lesson.module.course.instructorId !== userId) {
                throw new common_1.ForbiddenException('You can only view your own submissions or submissions from your courses');
            }
        }
        return this.mapSubmissionToResponse(submission);
    }
    async updateSubmission(submissionId, updateSubmissionDto, userId, userRole) {
        const submission = await this.submissionRepository.findById(submissionId);
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        if (userRole !== 'ADMIN' && submission.userId !== userId) {
            throw new common_1.ForbiddenException('You can only update your own submissions');
        }
        if (submission.grade !== null)
            throw new common_1.BadRequestException('Cannot update graded submission');
        const assignment = await this.prisma.assignment.findUnique({ where: { id: submission.assignmentId } });
        if (assignment?.dueDate && assignment.dueDate < new Date()) {
            throw new common_1.BadRequestException('Assignment submission deadline has passed');
        }
        const updatedSubmission = await this.submissionRepository.update(submissionId, updateSubmissionDto);
        return this.mapSubmissionToResponse(updatedSubmission);
    }
    async deleteSubmission(submissionId, userId, userRole) {
        const submission = await this.submissionRepository.findById(submissionId);
        if (!submission)
            throw new common_1.NotFoundException('Submission not found');
        if (userRole !== 'ADMIN' && submission.userId !== userId) {
            throw new common_1.ForbiddenException('You can only delete your own submissions');
        }
        if (submission.grade !== null)
            throw new common_1.BadRequestException('Cannot delete graded submission');
        await this.submissionRepository.delete(submissionId);
    }
    async gradeSubmission(submissionId, gradeSubmissionDto, userId, userRole) {
        const submissionWithCourse = await this.submissionRepository.getSubmissionWithCourse(submissionId);
        if (!submissionWithCourse)
            throw new common_1.NotFoundException('Submission not found');
        if (userRole !== 'ADMIN' && submissionWithCourse.assignment.lesson.module.course.instructorId !== userId) {
            throw new common_1.ForbiddenException('You can only grade submissions from your own courses');
        }
        const gradedSubmission = await this.submissionRepository.updateGrade(submissionId, gradeSubmissionDto.grade);
        return this.mapSubmissionToResponse(gradedSubmission);
    }
    async getSubmissionStats(assignmentId, userId, userRole) {
        const assignment = await this.prisma.assignment.findUnique({
            where: { id: assignmentId },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });
        if (!assignment)
            throw new common_1.NotFoundException('Assignment not found');
        if (userRole !== 'ADMIN' && assignment.lesson.module.course.instructorId !== userId) {
            throw new common_1.ForbiddenException('You can only view statistics for your own courses');
        }
        const stats = await this.submissionRepository.getSubmissionStats(assignmentId);
        return {
            totalSubmissions: stats.totalSubmissions,
            gradedSubmissions: stats.gradedSubmissions,
            pendingGrading: stats.totalSubmissions - stats.gradedSubmissions,
            averageGrade: stats.averageGrade,
            highestGrade: stats.highestGrade,
            lowestGrade: stats.lowestGrade,
        };
    }
    mapSubmissionToResponse(submission) {
        return {
            id: submission.id,
            assignmentId: submission.assignmentId,
            userId: submission.userId,
            content: submission.content ?? '',
            grade: submission.grade !== null ? Number(submission.grade) : null,
            submittedAt: submission.submittedAt,
            user: submission.user
                ? {
                    id: submission.user.id,
                    email: submission.user.email,
                    firstName: submission.user.firstName ?? undefined,
                    lastName: submission.user.lastName ?? undefined,
                }
                : undefined,
            assignment: submission.assignment ?? undefined,
        };
    }
};
exports.AssignmentSubmissionService = AssignmentSubmissionService;
exports.AssignmentSubmissionService = AssignmentSubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [assignment_submissions_repository_1.AssignmentSubmissionRepository,
        prisma_service_1.PrismaService])
], AssignmentSubmissionService);
//# sourceMappingURL=assignment-submissions.service.js.map