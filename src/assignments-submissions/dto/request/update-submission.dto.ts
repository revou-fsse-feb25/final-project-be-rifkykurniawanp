import { PartialType } from '@nestjs/swagger';
import { CreateAssignmentsSubmissionDto } from './submit-assignment.dto';

export class UpdateAssignmentsSubmissionDto extends PartialType(CreateAssignmentsSubmissionDto) {}
