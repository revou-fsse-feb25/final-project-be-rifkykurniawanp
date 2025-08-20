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
exports.AssignmentSubmissionRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentSubmissionRepository = class AssignmentSubmissionRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(assignmentId, userId, data) {
        return this.prisma.assignmentSubmission.create({
            data: {
                assignmentId,
                userId,
                content: data.content,
            },
        });
    }
    async findById(id) {
        return this.prisma.assignmentSubmission.findUnique({
            where: { id },
        });
    }
    async findByIdWithRelations(id) {
        const submission = await this.prisma.assignmentSubmission.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
                assignment: {
                    select: {
                        id: true,
                        title: true,
                        dueDate: true,
                    },
                },
            },
        });
        if (!submission)
            return null;
        return {
            ...submission,
            user: {
                ...submission.user,
                firstName: submission.user.firstName ?? undefined,
                lastName: submission.user.lastName ?? undefined,
            },
            assignment: {
                ...submission.assignment,
                dueDate: submission.assignment.dueDate ?? undefined,
            },
        };
    }
    async update(id, data) {
        return this.prisma.assignmentSubmission.update({
            where: { id },
            data: {
                content: data.content,
            },
        });
    }
    async updateGrade(id, grade) {
        return this.prisma.assignmentSubmission.update({
            where: { id },
            data: { grade },
        });
    }
    async delete(id) {
        await this.prisma.assignmentSubmission.delete({
            where: { id },
        });
    }
    async findByAssignmentId(assignmentId, filters, pagination) {
        const where = { assignmentId };
        if (filters?.graded === true)
            where.grade = { not: null };
        else if (filters?.graded === false)
            where.grade = null;
        if (filters?.userId)
            where.userId = filters.userId;
        const page = pagination?.page || 1;
        const limit = pagination?.limit || 20;
        const skip = (page - 1) * limit;
        const [submissions, total] = await Promise.all([
            this.prisma.assignmentSubmission.findMany({
                where,
                include: {
                    user: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                        },
                    },
                    assignment: {
                        select: {
                            id: true,
                            title: true,
                            dueDate: true,
                        },
                    },
                },
                orderBy: { submittedAt: 'desc' },
                skip,
                take: limit,
            }),
            this.prisma.assignmentSubmission.count({ where }),
        ]);
        const submissionsMapped = submissions.map(sub => ({
            ...sub,
            user: {
                ...sub.user,
                firstName: sub.user.firstName ?? undefined,
                lastName: sub.user.lastName ?? undefined,
            },
            assignment: {
                ...sub.assignment,
                dueDate: sub.assignment.dueDate ?? undefined,
            },
        }));
        return { submissions: submissionsMapped, total };
    }
    async findUserSubmission(assignmentId, userId) {
        return this.prisma.assignmentSubmission.findFirst({
            where: { assignmentId, userId },
        });
    }
    async exists(id) {
        const count = await this.prisma.assignmentSubmission.count({
            where: { id },
        });
        return count > 0;
    }
    async userHasSubmission(assignmentId, userId) {
        const count = await this.prisma.assignmentSubmission.count({
            where: { assignmentId, userId },
        });
        return count > 0;
    }
    async isOwner(submissionId, userId) {
        const count = await this.prisma.assignmentSubmission.count({
            where: { id: submissionId, userId },
        });
        return count > 0;
    }
    async getSubmissionStats(assignmentId) {
        const [totalSubmissions, gradedSubmissions, gradeStats] = await Promise.all([
            this.prisma.assignmentSubmission.count({ where: { assignmentId } }),
            this.prisma.assignmentSubmission.count({ where: { assignmentId, grade: { not: null } } }),
            this.prisma.assignmentSubmission.aggregate({
                where: { assignmentId, grade: { not: null } },
                _avg: { grade: true },
                _max: { grade: true },
                _min: { grade: true },
            }),
        ]);
        return {
            totalSubmissions,
            gradedSubmissions,
            averageGrade: gradeStats._avg.grade ? Number(gradeStats._avg.grade) : undefined,
            highestGrade: gradeStats._max.grade ? Number(gradeStats._max.grade) : undefined,
            lowestGrade: gradeStats._min.grade ? Number(gradeStats._min.grade) : undefined,
        };
    }
    async getSubmissionWithCourse(submissionId) {
        return this.prisma.assignmentSubmission.findUnique({
            where: { id: submissionId },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: {
                                            select: {
                                                id: true,
                                                instructorId: true,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.AssignmentSubmissionRepository = AssignmentSubmissionRepository;
exports.AssignmentSubmissionRepository = AssignmentSubmissionRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentSubmissionRepository);
//# sourceMappingURL=assignment-submissions.repository.js.map