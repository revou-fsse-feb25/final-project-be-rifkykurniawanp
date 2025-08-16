import { LessonType } from '@prisma/client';
export declare class CreateLessonDto {
    moduleId: number;
    slug?: string;
    title: string;
    description?: string;
    duration?: string;
    type: LessonType;
    videoUrl?: string;
    content?: string;
    quizQuestions?: string;
    passingScore?: number;
    orderNumber: number;
}
