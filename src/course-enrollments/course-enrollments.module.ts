import { Module } from '@nestjs/common';
import { EnrollmentsController } from './course-enrollments.controller';
import { EnrollmentsService } from './course-enrollments.service';
import { EnrollmentsRepository } from './course-enrollments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, EnrollmentsRepository, PrismaService],
  exports: [EnrollmentsService],
})
export class EnrollmentsModule {}
