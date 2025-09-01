import { LessonResponseDto } from '../../../lessons/dto/response/lesson.response.dto';
export declare class CourseModuleResponseDto {
    id: number;
    title: string;
    orderNumber: number;
    courseId: number;
    lessons: LessonResponseDto[];
    createdAt: Date;
    deletedAt?: Date | null;
}
