import { CourseResponseDto } from './course.response.dto';
import { ModuleLessonResponseDto } from './lesson.response.dto';
export declare class ModuleResponseDto {
    id: number;
    courseId: number;
    title: string;
    orderNumber: number;
    course?: CourseResponseDto;
    lessons?: ModuleLessonResponseDto[];
}
