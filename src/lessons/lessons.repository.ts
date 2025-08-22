import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ILessonsRepository, LessonFilter } from './interfaces/lessons.repository.interface';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';

@Injectable()
export class LessonsRepository implements ILessonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateLessonDto & { moduleId: number }) {
    return this.prisma.lesson.create({ data });
  }

  async findAll(skip: number, take: number, filter: LessonFilter = {}) {
    return this.prisma.lesson.findMany({
      skip,
      take,
      where: {
        moduleId: filter.moduleId,
        deletedAt: filter.deletedAt ?? null,
      },
      orderBy: { orderNumber: 'asc' },
      include: { module: true, assignments: true, progresses: true },
    });
  }

  async findById(id: number, filter: LessonFilter = {}) {
    return this.prisma.lesson.findFirst({
      where: { id, deletedAt: filter.deletedAt ?? null },
      include: { module: true, assignments: true, progresses: true },
    });
  }

  async findByIdIncludingDeleted(id: number) {
    return this.prisma.lesson.findUnique({
      where: { id },
      include: { module: true, assignments: true, progresses: true },
    });
  }

  async update(id: number, data: UpdateLessonDto) {
    return this.prisma.lesson.update({
      where: { id },
      data,
      include: { module: true, assignments: true, progresses: true },
    });
  }

  async softDelete(id: number) {
    return this.prisma.lesson.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async hardDelete(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }

  async restore(id: number) {
    return this.prisma.lesson.update({
      where: { id },
      data: { deletedAt: null },
      include: { module: true, assignments: true, progresses: true },
    });
  }
}
