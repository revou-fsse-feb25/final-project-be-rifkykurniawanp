import { LessonType } from '@prisma/client';
export declare class CreateLessonDto {
    title: string;
    description?: string;
    duration?: string;
    type?: LessonType;
    videoUrl?: string;
    content?: string;
    quizQuestions?: any;
    passingScore?: number;
    orderNumber: number;
}
