import { Injectable } from '@nestjs/common';
import { AssignmentsRepository } from './assignments.repository';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly repository: AssignmentsRepository) {}

  create(dto: CreateAssignmentDto) {
    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  update(id: number, dto: UpdateAssignmentDto) {
    return this.repository.update(id, dto);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
