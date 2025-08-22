import { LessonType } from '@prisma/client';
export declare class LessonResponseDto {
    id: number;
    title: string;
    description?: string;
    duration?: string;
    type: LessonType;
    moduleId: number;
    orderNumber: number;
    createdAt: Date;
}
