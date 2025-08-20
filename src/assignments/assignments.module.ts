import { Module } from '@nestjs/common';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { AssignmentsRepository } from './assignments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssignmentsController],
  providers: [
    AssignmentsService,
    AssignmentsRepository,
    PrismaService,
  ],
  exports: [AssignmentsService, AssignmentsRepository],
})
export class AssignmentsModule {}