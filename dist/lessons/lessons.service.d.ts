import { ILessonsRepository } from './interfaces/lessons.repository.interface';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { LessonResponseDto } from './dto/response/lesson.response.dto';
export declare class LessonsService {
    private readonly repo;
    constructor(repo: ILessonsRepository);
    create(createDto: CreateLessonDto, moduleId: number): Promise<LessonResponseDto>;
    findAll(moduleId: number, page?: number, limit?: number): Promise<LessonResponseDto[]>;
    findOne(id: number): Promise<LessonResponseDto>;
    update(id: number, updateDto: UpdateLessonDto): Promise<LessonResponseDto>;
    remove(id: number): Promise<void>;
    forceDelete(id: number): Promise<void>;
    restore(id: number): Promise<LessonResponseDto>;
    private toResponseDto;
}
