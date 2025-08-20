import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignmentSubmission } from '@prisma/client';
import { CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { 
  IAssignmentSubmissionRepository, 
  PaginationOptions, 
  AssignmentSubmissionFilters 
} from './interfaces/assignments-submissions.repository.interface';

@Injectable()
export class AssignmentSubmissionRepository implements IAssignmentSubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    assignmentId: number,
    userId: number,
    data: CreateAssignmentSubmissionDto,
  ): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.create({
      data: {
        assignmentId,
        userId,
        content: data.content,
      },
    });
  }

  async findById(id: number): Promise<AssignmentSubmission | null> {
    return this.prisma.assignmentSubmission.findUnique({
      where: { id },
    });
  }

  async findByIdWithRelations(id: number) {
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

    if (!submission) return null;

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

  async update(
    id: number,
    data: UpdateAssignmentSubmissionDto,
  ): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.update({
      where: { id },
      data: {
        content: data.content,
      },
    });
  }

  async updateGrade(id: number, grade: number): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.update({
      where: { id },
      data: { grade },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.assignmentSubmission.delete({
      where: { id },
    });
  }

  async findByAssignmentId(
    assignmentId: number,
    filters?: AssignmentSubmissionFilters,
    pagination?: PaginationOptions,
  ) {
    const where: any = { assignmentId };

    if (filters?.graded === true) where.grade = { not: null };
    else if (filters?.graded === false) where.grade = null;

    if (filters?.userId) where.userId = filters.userId;

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

  async findUserSubmission(
    assignmentId: number,
    userId: number,
  ): Promise<AssignmentSubmission | null> {
    return this.prisma.assignmentSubmission.findFirst({
      where: { assignmentId, userId },
    });
  }

  async exists(id: number): Promise<boolean> {
    const count = await this.prisma.assignmentSubmission.count({
      where: { id },
    });
    return count > 0;
  }

  async userHasSubmission(assignmentId: number, userId: number): Promise<boolean> {
    const count = await this.prisma.assignmentSubmission.count({
      where: { assignmentId, userId },
    });
    return count > 0;
  }

  async isOwner(submissionId: number, userId: number): Promise<boolean> {
    const count = await this.prisma.assignmentSubmission.count({
      where: { id: submissionId, userId },
    });
    return count > 0;
  }

  async getSubmissionStats(assignmentId: number) {
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

  async getSubmissionWithCourse(submissionId: number) {
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
}
