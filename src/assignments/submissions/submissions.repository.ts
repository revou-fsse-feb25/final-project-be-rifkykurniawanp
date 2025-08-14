import { Injectable, NotFoundException } from '@nestjs/common';
import { ISubmissionsRepository } from './interface/submissions.repository.interface';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { SubmissionResponseDto } from './dto/response/submission-response.dto';

@Injectable()
export class SubmissionsRepository implements ISubmissionsRepository {
  private items: SubmissionResponseDto[] = [];
  private idSeq = 1000;

  async create(assignmentId: number, dto: CreateSubmissionDto): Promise<SubmissionResponseDto> {
    const now = new Date();
    const created: SubmissionResponseDto = {
      id: this.idSeq++,
      assignmentId,
      userId: dto.userId,
      contentUrl: dto.contentUrl ?? null,
      notes: dto.notes ?? null,
      grade: null,
      feedback: null,
      submittedAt: now,
      updatedAt: now,
    };
    this.items.push(created);
    return created;
  }

  async findAll(assignmentId: number, page: number, limit: number) {
    const list = this.items.filter(i => i.assignmentId === assignmentId);
    const total = list.length;
    const start = (page - 1) * limit;
    const data = list.slice(start, start + limit);
    return { data, total, page, limit };
  }

  async findOne(assignmentId: number, id: number) {
    return this.items.find(i => i.assignmentId === assignmentId && i.id === id) ?? null;
  }

  async update(assignmentId: number, id: number, dto: UpdateSubmissionDto): Promise<SubmissionResponseDto> {
    const found = await this.findOne(assignmentId, id);
    if (!found) throw new NotFoundException(`Submission ${id} not found for assignment ${assignmentId}`);
    const updated: SubmissionResponseDto = {
      ...found,
      ...dto,
      updatedAt: new Date(),
    };
    this.items = this.items.map(i => (i.id === id ? updated : i));
    return updated;
  }

  async remove(assignmentId: number, id: number): Promise<void> {
    this.items = this.items.filter(i => !(i.assignmentId === assignmentId && i.id === id));
  }
}
