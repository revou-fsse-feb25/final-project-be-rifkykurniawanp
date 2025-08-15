import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  create(dto: CreateLessonDto) {
    return this.lessonsRepository.create(dto);
  }

  findAll() {
    return this.lessonsRepository.findAll();
  }

  findOne(id: number) {
    return this.lessonsRepository.findOne(id);
  }

  update(id: number, dto: UpdateLessonDto) {
    return this.lessonsRepository.update(id, dto);
  }

  remove(id: number) {
    return this.lessonsRepository.remove(id);
  }
}
