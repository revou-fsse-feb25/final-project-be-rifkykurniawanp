// src/assignments/assignments.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';
import { SubmissionResponseDto } from './dto/response/submission.response.dto';
import { RoleName } from '@prisma/client';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ================= ASSIGNMENT METHODS =================
  async create(dto: CreateAssignmentDto, userId: number, role: RoleName) {
    if (!['ADMIN', 'INSTRUCTOR'].includes(role)) {
      throw new ForbiddenException('Access denied');
    }

    const lesson = await this.prisma.lesson.findUnique({
      where: { id: dto.lessonId },
      include: { module: { include: { course: true } } },
    });
    if (!lesson) throw new NotFoundException('Lesson not found');

    const assignment = await this.prisma.assignment.create({
      data: { ...dto },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });

    return this.mapAssignment(assignment);
  }

  async findAll(page: number, limit: number, role: RoleName) {
    const skip = (page - 1) * limit;
    const assignments = await this.prisma.assignment.findMany({
      where: { deletedAt: null },
      skip,
      take: limit,
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    return assignments.map(this.mapAssignment);
  }

  async getDeleted(page: number, limit: number, role: RoleName) {
    if (role !== 'ADMIN') throw new ForbiddenException('Access denied');

    const skip = (page - 1) * limit;
    const assignments = await this.prisma.assignment.findMany({
      where: { NOT: { deletedAt: null } },
      skip,
      take: limit,
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    return assignments.map(this.mapAssignment);
  }

  async findByLesson(lessonId: number, userId: number, role: RoleName) {
    const assignments = await this.prisma.assignment.findMany({
      where: { lessonId, deletedAt: null },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    return assignments.map(this.mapAssignment);
  }

  async findByCourse(courseId: number, userId: number, role: RoleName) {
    const assignments = await this.prisma.assignment.findMany({
      where: {
        lesson: { module: { courseId } },
        deletedAt: null,
      },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    return assignments.map(this.mapAssignment);
  }

  async findOne(id: number, userId: number, role: RoleName) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    if (!assignment || assignment.deletedAt) throw new NotFoundException('Assignment not found');
    return this.mapAssignment(assignment);
  }

  async update(id: number, dto: UpdateAssignmentDto, userId: number, role: RoleName) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment || assignment.deletedAt) throw new NotFoundException('Assignment not found');

    const updated = await this.prisma.assignment.update({
      where: { id },
      data: { ...dto },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });
    return this.mapAssignment(updated);
  }

  async remove(id: number, userId: number, role: RoleName) {
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment || assignment.deletedAt) throw new NotFoundException('Assignment not found');

    await this.prisma.assignment.update({ where: { id }, data: { deletedAt: new Date() } });
    return { message: 'Assignment soft deleted successfully' };
  }

  async forceDelete(id: number, role: RoleName) {
    if (role !== 'ADMIN') throw new ForbiddenException('Access denied');
    await this.prisma.assignment.delete({ where: { id } });
    return { message: 'Assignment permanently deleted' };
  }

  async restore(id: number, role: RoleName) {
    if (role !== 'ADMIN') throw new ForbiddenException('Access denied');
    const assignment = await this.prisma.assignment.findUnique({ where: { id } });
    if (!assignment) throw new NotFoundException('Assignment not found');
    await this.prisma.assignment.update({ where: { id }, data: { deletedAt: null } });
    return this.mapAssignment({ ...assignment, deletedAt: null });
  }

  // ================= SUBMISSION METHODS =================
  async createSubmission(dto: CreateSubmissionDto, userId: number, role: RoleName) {
    const submission = await this.prisma.assignmentSubmission.create({
      data: { ...dto, userId },
      include: {
        assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
        user: true,
      },
    });
    return this.mapSubmission(submission);
  }

  async findSubmissionsByAssignment(assignmentId: number, userId: number, role: RoleName) {
    const submissions = await this.prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      include: {
        assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
        user: true,
      },
    });
    return submissions.map(this.mapSubmission);
  }

  async findSubmissionsByUser(targetUserId: number, userId: number, role: RoleName) {
    const submissions = await this.prisma.assignmentSubmission.findMany({
      where: { userId: targetUserId },
      include: {
        assignment: { include: { lesson: { include: { module: { include: { course: true } } } } } },
        user: true,
      },
    });
    return submissions.map(this.mapSubmission);
  }

  async updateSubmission(id: number, dto: UpdateSubmissionDto, userId: number, role: RoleName) {
    const submission = await this.prisma.assignmentSubmission.findUnique({ where: { id } });
    if (!submission) throw new NotFoundException('Submission not found');

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

  async removeSubmission(id: number, userId: number, role: RoleName) {
    const submission = await this.prisma.assignmentSubmission.findUnique({ where: { id } });
    if (!submission) throw new NotFoundException('Submission not found');
    await this.prisma.assignmentSubmission.delete({ where: { id } });
    return { message: 'Submission deleted successfully' };
  }

  // ================= MAPPING FUNCTIONS =================
  private mapAssignment(a: any): AssignmentResponseDto {
    if (!a.lesson) throw new NotFoundException('Lesson not found in assignment');
    if (!a.lesson.module) throw new NotFoundException('Module not found in lesson');
    if (!a.lesson.module.course) throw new NotFoundException('Course not found in module');

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

  private mapSubmission(s: any): SubmissionResponseDto {
    if (!s.assignment) throw new NotFoundException('Assignment not found');
    if (!s.assignment.lesson) throw new NotFoundException('Lesson not found in assignment');
    if (!s.assignment.lesson.module) throw new NotFoundException('Module not found in lesson');
    if (!s.assignment.lesson.module.course) throw new NotFoundException('Course not found in module');

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
}
