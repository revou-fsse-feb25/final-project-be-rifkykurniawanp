import { LessonType } from '@prisma/client';
export declare class LessonResponseDto {
    id: number;
    moduleId: number;
    slug?: string;
    title: string;
    description?: string;
    duration?: string;
    type: LessonType;
    videoUrl?: string;
    content?: string;
    quizQuestions?: string;
    passingScore: number;
    orderNumber: number;
    createdAt: Date;
}
