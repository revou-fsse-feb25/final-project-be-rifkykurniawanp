import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { LessonResponseDto } from './dto/response/lesson.response.dto';
export declare class LessonsController {
    private readonly service;
    constructor(service: LessonsService);
    create(createDto: CreateLessonDto, moduleId: number): Promise<LessonResponseDto>;
    findAll(moduleId: number): Promise<LessonResponseDto[]>;
    findOne(id: number): Promise<LessonResponseDto>;
    update(id: number, updateDto: UpdateLessonDto): Promise<LessonResponseDto>;
    remove(id: number): Promise<void>;
    forceDelete(id: number): Promise<void>;
    restore(id: number): Promise<LessonResponseDto>;
}
