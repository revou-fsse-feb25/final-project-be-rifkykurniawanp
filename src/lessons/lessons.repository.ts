import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';

@Injectable()
export class LessonsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({ data: dto });
  }

  findAll() {
    return this.prisma.lesson.findMany();
  }

  findOne(id: number) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
