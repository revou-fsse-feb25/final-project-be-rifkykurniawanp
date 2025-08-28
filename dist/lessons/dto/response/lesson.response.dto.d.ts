import { LessonType } from '@prisma/client';
export declare class LessonResponseDto {
    id: number;
    title: string;
    slug?: string | null;
    description?: string;
    duration?: string;
    type: LessonType;
    moduleId: number;
    orderNumber: number;
    videoUrl?: string;
    content?: string;
    quizQuestions?: any;
    passingScore?: number;
    createdAt: Date;
    deletedAt?: Date | null;
}
export default LessonResponseDto;
