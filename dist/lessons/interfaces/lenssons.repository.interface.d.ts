import { CreateLessonDto } from '../dto/request/create-lesson.dto';
import { UpdateLessonDto } from '../dto/request/update-lesson.dto';
export interface ILessonsRepository {
    create(dto: CreateLessonDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateLessonDto): any;
    remove(id: number): any;
}
