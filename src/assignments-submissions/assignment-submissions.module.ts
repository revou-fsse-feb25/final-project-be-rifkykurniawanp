import { Module } from '@nestjs/common';
import { SubmissionController } from './assignment-submissions.controller';
import { AssignmentSubmissionService } from './assignment-submissions.service';
import { AssignmentSubmissionRepository } from './assignment-submissions.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SubmissionController],
  providers: [
    AssignmentSubmissionService,
    AssignmentSubmissionRepository,
    PrismaService,
  ],
  exports: [AssignmentSubmissionService, AssignmentSubmissionRepository], // Export for use in other modules
})
export class SubmissionModule {}