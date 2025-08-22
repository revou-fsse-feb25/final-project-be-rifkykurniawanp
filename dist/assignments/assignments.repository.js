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
exports.AssignmentsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentsRepository = class AssignmentsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.assignment.create({
            data,
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findById(id, where) {
        return this.prisma.assignment.findFirst({
            where: { id, ...where },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findByIdIncludingDeleted(id) {
        return this.prisma.assignment.findUnique({
            where: { id },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findByLessonId(lessonId, where) {
        return this.prisma.assignment.findMany({
            where: { lessonId, ...where },
            orderBy: { createdAt: 'desc' },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findByCourseId(courseId, where) {
        return this.prisma.assignment.findMany({
            where: {
                lesson: {
                    module: {
                        courseId
                    }
                },
                ...where
            },
            orderBy: { createdAt: 'desc' },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findAll(skip = 0, take = 10, where) {
        return this.prisma.assignment.findMany({
            where,
            skip,
            take,
            orderBy: { createdAt: 'desc' },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findDeleted(skip = 0, take = 10) {
        return this.prisma.assignment.findMany({
            where: { deletedAt: { not: null } },
            skip,
            take,
            orderBy: { deletedAt: 'desc' },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async update(id, data) {
        return this.prisma.assignment.update({
            where: { id },
            data,
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async softDelete(id) {
        return this.prisma.assignment.update({
            where: { id },
            data: { deletedAt: new Date() },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async hardDelete(id) {
        return this.prisma.assignment.delete({
            where: { id },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async restore(id) {
        return this.prisma.assignment.update({
            where: { id },
            data: { deletedAt: null },
            include: {
                lesson: {
                    include: {
                        module: {
                            include: {
                                course: true
                            }
                        }
                    }
                },
                submissions: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async countByLesson(lessonId, where) {
        return this.prisma.assignment.count({
            where: { lessonId, ...where }
        });
    }
    async countByCourse(courseId, where) {
        return this.prisma.assignment.count({
            where: {
                lesson: {
                    module: {
                        courseId
                    }
                },
                ...where
            }
        });
    }
    async createSubmission(data) {
        return this.prisma.assignmentSubmission.create({
            data,
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async findSubmissionById(id) {
        return this.prisma.assignmentSubmission.findUnique({
            where: { id },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async findSubmissionByUserAndAssignment(userId, assignmentId) {
        return this.prisma.assignmentSubmission.findFirst({
            where: { userId, assignmentId },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async findSubmissionsByAssignment(assignmentId) {
        return this.prisma.assignmentSubmission.findMany({
            where: { assignmentId },
            orderBy: { submittedAt: 'desc' },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async findSubmissionsByUser(userId) {
        return this.prisma.assignmentSubmission.findMany({
            where: { userId },
            orderBy: { submittedAt: 'desc' },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async updateSubmission(id, data) {
        return this.prisma.assignmentSubmission.update({
            where: { id },
            data,
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async deleteSubmission(id) {
        return this.prisma.assignmentSubmission.delete({
            where: { id },
            include: {
                assignment: {
                    include: {
                        lesson: {
                            include: {
                                module: {
                                    include: {
                                        course: true
                                    }
                                }
                            }
                        }
                    }
                },
                user: true
            }
        });
    }
    async countSubmissionsByAssignment(assignmentId) {
        return this.prisma.assignmentSubmission.count({
            where: { assignmentId }
        });
    }
    async countSubmissionsByUser(userId) {
        return this.prisma.assignmentSubmission.count({
            where: { userId }
        });
    }
    async countGradedSubmissionsByAssignment(assignmentId) {
        return this.prisma.assignmentSubmission.count({
            where: {
                assignmentId,
                grade: { not: null }
            }
        });
    }
};
exports.AssignmentsRepository = AssignmentsRepository;
exports.AssignmentsRepository = AssignmentsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsRepository);
//# sourceMappingURL=assignments.repository.js.map