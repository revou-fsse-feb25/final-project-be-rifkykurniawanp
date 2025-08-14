import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ISubmissionsRepository } from './interface/submissions.repository.interface';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @Inject('ISubmissionsRepository')
    private readonly repo: ISubmissionsRepository,
  ) {}

  create(assignmentId: string | number, dto: CreateSubmissionDto) {
    return this.repo.create(Number(assignmentId), dto);
  }

  findAll(assignmentId: string | number, page = 1, limit = 10) {
    return this.repo.findAll(Number(assignmentId), Number(page), Number(limit));
  }

  async findOne(assignmentId: string | number, id: string | number) {
    const item = await this.repo.findOne(Number(assignmentId), Number(id));
    if (!item) throw new NotFoundException(`Submission ${id} not found`);
    return item;
  }

  update(assignmentId: string | number, id: string | number, dto: UpdateSubmissionDto) {
    return this.repo.update(Number(assignmentId), Number(id), dto);
  }

  remove(assignmentId: string | number, id: string | number) {
    return this.repo.remove(Number(assignmentId), Number(id));
  }
}
