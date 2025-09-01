declare class CourseInfoDto {
    id: number;
    title: string;
    instructorId: number;
}
declare class LessonDto {
    id: number;
    slug: string;
    title: string;
    description: string;
    duration: string;
    type: string;
    orderNumber: number;
}
export declare class ModuleResponseDto {
    id: number;
    courseId: number;
    title: string;
    orderNumber: number;
    course: CourseInfoDto;
    lessons: LessonDto[];
    createdAt: Date;
}
export {};
