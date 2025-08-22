import { CreateLessonDto } from '../dto/request/create-lesson.dto';
import { UpdateLessonDto } from '../dto/request/update-lesson.dto';
export interface LessonFilter {
    moduleId?: number;
    deletedAt?: Date | null;
}
export interface ILessonsRepository {
    create(data: CreateLessonDto & {
        moduleId: number;
    }): Promise<any>;
    findAll(skip: number, take: number, filter?: LessonFilter): Promise<any[]>;
    findById(id: number, filter?: LessonFilter): Promise<any>;
    findByIdIncludingDeleted(id: number): Promise<any>;
    update(id: number, data: UpdateLessonDto): Promise<any>;
    softDelete(id: number): Promise<any>;
    hardDelete(id: number): Promise<any>;
    restore(id: number): Promise<any>;
}
