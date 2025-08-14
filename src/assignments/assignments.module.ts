import { Module } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsRepository } from './assignments.repository';
import { SubmissionsModule } from './submissions/submissions.module';

@Module({
  imports: [SubmissionsModule],
  controllers: [AssignmentsController],
  providers: [
    AssignmentsService,
    { provide: 'IAssignmentsRepository', useClass: AssignmentsRepository },
  ],
  exports: [AssignmentsService],
})
export class AssignmentsModule {}
