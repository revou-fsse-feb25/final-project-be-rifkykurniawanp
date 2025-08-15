import { Injectable } from '@nestjs/common';
import { LessonProgressesRepository } from './lesson-progresses.repository';

@Injectable()
export class LessonProgressesService {
  constructor(private readonly repository: LessonProgressesRepository) {}

  getProgress(userId: number, lessonId: number) {
    return this.repository.findOne(userId, lessonId);
  }

  markCompleted(userId: number, lessonId: number) {
    return this.repository.markCompleted(userId, lessonId);
  }

  getAllByUser(userId: number) {
    return this.repository.findAllByUser(userId);
  }
}
