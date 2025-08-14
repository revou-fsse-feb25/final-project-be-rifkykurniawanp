import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IAssignmentsRepository } from './interface/assignments.repository.interface';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { GradeAssignmentDto } from './dto/request/grade-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @Inject('IAssignmentsRepository')
    private readonly repo: IAssignmentsRepository,
  ) {}

  create(dto: CreateAssignmentDto) {
    return this.repo.create(dto);
  }

  findAll(page = 1, limit = 10) {
    return this.repo.findAll(page, limit);
  }

  async findOne(id: number) {
    const item = await this.repo.findOne(id);
    if (!item) throw new NotFoundException(`Assignment ${id} not found`);
    return item;
  }

  update(id: number, dto: UpdateAssignmentDto) {
    return this.repo.update(id, dto);
  }

  grade(id: number, dto: GradeAssignmentDto) {
    return this.repo.grade(id, dto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
