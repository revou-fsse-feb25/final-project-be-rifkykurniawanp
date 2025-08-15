import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsRepository } from './assignments.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AssignmentsController],
  providers: [AssignmentsService, AssignmentsRepository, PrismaService],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
