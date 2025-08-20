import { Injectable } from '@nestjs/common';
import { LessonsRepository } from './lessons.repository';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private readonly lessonsRepository: LessonsRepository) {}

  create(dto: CreateLessonDto) {
    // dto harus sudah berisi moduleId (dipaksa di controller via path param)
    return this.lessonsRepository.create(dto);
  }

  findAllByModule(moduleId: number) {
    return this.lessonsRepository.findAllByModule(moduleId);
  }

  findOne(id: number) {
    return this.lessonsRepository.findOne(id);
  }

  findBySlug(slug: string) {
    return this.lessonsRepository.findBySlug(slug);
  }

  update(id: number, dto: UpdateLessonDto) {
    return this.lessonsRepository.update(id, dto);
  }

  remove(id: number) {
    return this.lessonsRepository.remove(id);
  }

  // ===== Progress (per user) =====
  getProgress(lessonId: number, userId: number) {
    return this.lessonsRepository.getProgress(lessonId, userId);
  }

  completeLesson(lessonId: number, userId: number) {
    return this.lessonsRepository.completeLesson(lessonId, userId);
  }

  // Course progress: biasanya per user; admin bisa lihat semua (optional filter)
  getCourseProgress(courseId: number, userId?: number) {
    return this.lessonsRepository.getCourseProgress(courseId, userId);
  }
}
