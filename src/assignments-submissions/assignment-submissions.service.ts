import { Injectable } from '@nestjs/common';
import { AssignmentSubmissionsRepository } from './assignment-submissions.repository';
import { SubmitAssignmentDto } from './dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';

@Injectable()
export class AssignmentSubmissionsService {
  constructor(private readonly repository: AssignmentSubmissionsRepository) {}

  submit(dto: SubmitAssignmentDto) {
    return this.repository.submit(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateSubmissionDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
