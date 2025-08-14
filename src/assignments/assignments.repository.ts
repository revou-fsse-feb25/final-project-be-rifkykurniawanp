import { Injectable, NotFoundException } from '@nestjs/common';
import { IAssignmentsRepository } from './interface/assignments.repository.interface';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { GradeAssignmentDto } from './dto/request/grade-assignment.dto';
import { AssignmentResponseDto } from './dto/response/assignment-response.dto';

@Injectable()
export class AssignmentsRepository implements IAssignmentsRepository {
  private items: AssignmentResponseDto[] = [];
  private idSeq = 1;

  async create(dto: CreateAssignmentDto): Promise<AssignmentResponseDto> {
    const now = new Date();
    const created: AssignmentResponseDto = {
      id: this.idSeq++,
      lessonId: dto.lessonId,
      title: dto.title,
      instructions: dto.instructions ?? null,
      dueDate: dto.dueDate ?? null,
      createdAt: now,
      updatedAt: now,
      averageGrade: null,
      submissionsCount: 0,
    };
    this.items.push(created);
    return created;
  }

  async findAll(page: number, limit: number): Promise<{ data: AssignmentResponseDto[]; total: number; page: number; limit: number }> {
    const total = this.items.length;
    const start = (page - 1) * limit;
    const data = this.items.slice(start, start + limit);
    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<AssignmentResponseDto | null> {
    return this.items.find(i => i.id === id) ?? null;
  }

  async update(id: number, dto: UpdateAssignmentDto): Promise<AssignmentResponseDto> {
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException(`Assignment ${id} not found`);
    const updated: AssignmentResponseDto = {
      ...found,
      ...dto,
      updatedAt: new Date(),
    };
    this.items = this.items.map(i => (i.id === id ? updated : i));
    return updated;
  }

  async grade(id: number, dto: GradeAssignmentDto): Promise<AssignmentResponseDto> {
    // In real impl, grading per submission; here we just update aggregate.
    const found = await this.findOne(id);
    if (!found) throw new NotFoundException(`Assignment ${id} not found`);
    const avg = found.averageGrade ?? dto.grade;
    const updated: AssignmentResponseDto = {
      ...found,
      averageGrade: Math.round(((avg + dto.grade) / 2) * 100) / 100,
      updatedAt: new Date(),
    };
    this.items = this.items.map(i => (i.id === id ? updated : i));
    return updated;
  }

  async remove(id: number): Promise<void> {
    this.items = this.items.filter(i => i.id !== id);
  }
}
