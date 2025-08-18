import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EnrollmentGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const lessonId = request.params.lessonId;
    const assignmentId = request.params.id;

    // ADMIN can access everything
    if (user.role === 'ADMIN') {
      return true;
    }

    let courseId: number | null = null;

    // If accessing via lessonId
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
        throw new ForbiddenException('Lesson not found');
      }

      courseId = lesson.module.courseId;

      // INSTRUCTOR can access their own courses
      if (
        user.role === 'INSTRUCTOR' &&
        lesson.module.course.instructorId === user.id
      ) {
        return true;
      }
    }

    // If accessing via assignmentId
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
        throw new ForbiddenException('Assignment not found');
      }

      courseId = assignment.lesson.module.courseId;

      // INSTRUCTOR can access their own courses
      if (
        user.role === 'INSTRUCTOR' &&
        assignment.lesson.module.course.instructorId === user.id
      ) {
        return true;
      }
    }

    // For USER role, check enrollment
    if (user.role === 'USER') {
      if (!courseId) {
        throw new ForbiddenException(
          'CourseId could not be determined. Please provide lessonId or assignmentId.',
        );
      }

      const enrollment = await this.prisma.courseEnrollment.findFirst({
        where: {
          courseId,
          studentId: user.id,
        },
      });

      if (!enrollment) {
        throw new ForbiddenException(
          'You must be enrolled in this course to access this content',
        );
      }

      return true;
    }

    return false;
  }
}
