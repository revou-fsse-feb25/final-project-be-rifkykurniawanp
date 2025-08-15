import { Module } from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { CourseEnrollmentsController } from './course-enrollments.controller';
import { CourseEnrollmentsRepository } from './course-enrollments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CourseEnrollmentsController],
  providers: [CourseEnrollmentsService, CourseEnrollmentsRepository, PrismaService],
  exports: [CourseEnrollmentsService],
})
export class CourseEnrollmentsModule {}
