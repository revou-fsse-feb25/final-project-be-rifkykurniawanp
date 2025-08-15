import { SubmitAssignmentDto } from '../dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from '../dto/request/update-submission.dto';

export interface IAssignmentSubmissionsRepository {
  submit(dto: SubmitAssignmentDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateSubmissionDto);
  remove(id: number);
}
