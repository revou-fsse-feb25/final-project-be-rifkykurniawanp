import { Injectable } from '@nestjs/common';
import { CreateLessonProgressDto } from './dto/create-lesson-progress.dto';
import { UpdateLessonProgressDto } from './dto/update-lesson-progress.dto';

@Injectable()
export class LessonProgressesService {
  create(createLessonProgressDto: CreateLessonProgressDto) {
    return 'This action adds a new lessonProgress';
  }

  findAll() {
    return `This action returns all lessonProgresses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lessonProgress`;
  }

  update(id: number, updateLessonProgressDto: UpdateLessonProgressDto) {
    return `This action updates a #${id} lessonProgress`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonProgress`;
  }
}
