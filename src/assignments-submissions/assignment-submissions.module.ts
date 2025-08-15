import { Module } from '@nestjs/common';
import { AssignmentSubmissionsService } from './assignment-submissions.service';
import { AssignmentSubmissionsController } from './assignment-submissions.controller';
import { AssignmentSubmissionsRepository } from './assignment-submissions.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssignmentSubmissionsController],
  providers: [AssignmentSubmissionsService, AssignmentSubmissionsRepository, PrismaService],
  exports: [AssignmentSubmissionsService],
})
export class AssignmentSubmissionsModule {}
