import { Module } from '@nestjs/common';
import { AssignmentsSubmissionsService } from './assignments-submissions.service';
import { AssignmentsSubmissionsController } from './assignments-submissions.controller';

@Module({
  controllers: [AssignmentsSubmissionsController],
  providers: [AssignmentsSubmissionsService],
})
export class AssignmentsSubmissionsModule {}
