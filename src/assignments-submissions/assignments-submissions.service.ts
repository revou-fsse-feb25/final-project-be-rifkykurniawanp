import { Injectable } from '@nestjs/common';
import { CreateAssignmentsSubmissionDto } from './dto/request/submit-assignment.dto';
import { UpdateAssignmentsSubmissionDto } from './dto/request/update-submission.dto';

@Injectable()
export class AssignmentsSubmissionsService {
  create(createAssignmentsSubmissionDto: CreateAssignmentsSubmissionDto) {
    return 'This action adds a new assignmentsSubmission';
  }

  findAll() {
    return `This action returns all assignmentsSubmissions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} assignmentsSubmission`;
  }

  update(id: number, updateAssignmentsSubmissionDto: UpdateAssignmentsSubmissionDto) {
    return `This action updates a #${id} assignmentsSubmission`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignmentsSubmission`;
  }
}
