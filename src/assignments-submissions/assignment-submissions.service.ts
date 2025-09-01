import { 
  Injectable, 
  NotFoundException, 
  ForbiddenException, 
  BadRequestException,
  ConflictException 
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AssignmentSubmissionRepository } from './assignment-submissions.repository';
import { CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { GradeAssignmentSubmissionDto } from './dto/request/grade-assignment-submission.dto';
import { 
  AssignmentSubmissionListResponseDto,
  AssignmentSubmissionResponseDto,
  AssignmentSubmissionStatsDto
} from './dto/response/submission.response.dto';
import { RoleName } from '@prisma/client';

@Injectable()
export class AssignmentSubmissionService {
  constructor(
    private readonly submissionRepository: AssignmentSubmissionRepository,
    private readonly prisma: PrismaService,
  ) {}

  // -------------------- SUBMIT ASSIGNMENT --------------------
  async submitAssignment(
    assignmentId: number,
    createSubmissionDto: CreateAssignmentSubmissionDto,
    userId: number,
  ): Promise<AssignmentSubmissionResponseDto> {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { 
        lesson: { include: { module: { include: { course: true } } } } 
      },
    });

    if (!assignment) throw new NotFoundException('Assignment not found');

    const enrollment = await this.prisma.courseEnrollment.findFirst({
      where: {
        courseId: assignment.lesson.module.courseId,
        studentId: userId,
      },
    });

    if (!enrollment) throw new ForbiddenException('You must be enrolled in this course');

    const existingSubmission = await this.submissionRepository.userHasSubmission(assignmentId, userId);
    if (existingSubmission) throw new ConflictException('You have already submitted this assignment');

    if (assignment.dueDate && assignment.dueDate < new Date()) {
      throw new BadRequestException('Assignment submission deadline has passed');
    }

    const submission = await this.submissionRepository.create(assignmentId, userId, createSubmissionDto);

    return this.mapSubmissionToResponse(submission);
  }

  // -------------------- GET SUBMISSIONS --------------------
  async getAssignmentSubmissions(
    assignmentId: number,
    userId: number,
    userRole: RoleName,
    page = 1,
    limit = 20,
    graded?: boolean,
    filterUserId?: number,
  ): Promise<AssignmentSubmissionListResponseDto> {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });

    if (!assignment) throw new NotFoundException('Assignment not found');

    if (userRole !== 'ADMIN' && assignment.lesson.module.course.instructorId !== userId) {
      throw new ForbiddenException('You can only view submissions for your own courses');
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

  // -------------------- GET SUBMISSION BY ID --------------------
  async getSubmissionById(
    submissionId: number,
    userId: number,
    userRole: RoleName,
  ): Promise<AssignmentSubmissionResponseDto> {
    const submission = await this.submissionRepository.findByIdWithRelations(submissionId);
    if (!submission) throw new NotFoundException('Submission not found');

    if (userRole !== 'ADMIN' && !(userRole === 'USER' && submission.userId === userId)) {
      const submissionWithCourse = await this.submissionRepository.getSubmissionWithCourse(submissionId);
      if (!submissionWithCourse || submissionWithCourse.assignment.lesson.module.course.instructorId !== userId) {
        throw new ForbiddenException('You can only view your own submissions or submissions from your courses');
      }
    }

    return this.mapSubmissionToResponse(submission);
  }

  // -------------------- UPDATE SUBMISSION --------------------
  async updateSubmission(
    submissionId: number,
    updateSubmissionDto: UpdateAssignmentSubmissionDto,
    userId: number,
    userRole: RoleName,
  ): Promise<AssignmentSubmissionResponseDto> {
    const submission = await this.submissionRepository.findById(submissionId);
    if (!submission) throw new NotFoundException('Submission not found');

    if (userRole !== 'ADMIN' && submission.userId !== userId) {
      throw new ForbiddenException('You can only update your own submissions');
    }

    if (submission.grade !== null) throw new BadRequestException('Cannot update graded submission');

    const assignment = await this.prisma.assignment.findUnique({ where: { id: submission.assignmentId } });
    if (assignment?.dueDate && assignment.dueDate < new Date()) {
      throw new BadRequestException('Assignment submission deadline has passed');
    }

    const updatedSubmission = await this.submissionRepository.update(submissionId, updateSubmissionDto);

    return this.mapSubmissionToResponse(updatedSubmission);
  }

  // -------------------- DELETE SUBMISSION --------------------
  async deleteSubmission(submissionId: number, userId: number, userRole: RoleName): Promise<void> {
    const submission = await this.submissionRepository.findById(submissionId);
    if (!submission) throw new NotFoundException('Submission not found');

    if (userRole !== 'ADMIN' && submission.userId !== userId) {
      throw new ForbiddenException('You can only delete your own submissions');
    }

    if (submission.grade !== null) throw new BadRequestException('Cannot delete graded submission');

    await this.submissionRepository.delete(submissionId);
  }

  // -------------------- GRADE SUBMISSION --------------------
  async gradeSubmission(
    submissionId: number,
    gradeSubmissionDto: GradeAssignmentSubmissionDto,
    userId: number,
    userRole: RoleName,
  ): Promise<AssignmentSubmissionResponseDto> {
    const submissionWithCourse = await this.submissionRepository.getSubmissionWithCourse(submissionId);
    if (!submissionWithCourse) throw new NotFoundException('Submission not found');

    if (userRole !== 'ADMIN' && submissionWithCourse.assignment.lesson.module.course.instructorId !== userId) {
      throw new ForbiddenException('You can only grade submissions from your own courses');
    }

    const gradedSubmission = await this.submissionRepository.updateGrade(submissionId, gradeSubmissionDto.grade);

    return this.mapSubmissionToResponse(gradedSubmission);
  }

  // -------------------- GET SUBMISSION STATS --------------------
  async getSubmissionStats(
    assignmentId: number,
    userId: number,
    userRole: RoleName,
  ): Promise<AssignmentSubmissionStatsDto> {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { lesson: { include: { module: { include: { course: true } } } } },
    });

    if (!assignment) throw new NotFoundException('Assignment not found');
    if (userRole !== 'ADMIN' && assignment.lesson.module.course.instructorId !== userId) {
      throw new ForbiddenException('You can only view statistics for your own courses');
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

  // -------------------- HELPERS --------------------
  private mapSubmissionToResponse(submission: any): AssignmentSubmissionResponseDto {
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
}
