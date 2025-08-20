import { CreateLessonDto } from '../dto/request/create-lesson.dto';
import { UpdateLessonDto } from '../dto/request/update-lesson.dto';

export interface ILessonsRepository {
  create(dto: CreateLessonDto);
  findAll();
  findOne(id: number);
  update(id: number, dto: UpdateLessonDto);
  remove(id: number);
  
}
