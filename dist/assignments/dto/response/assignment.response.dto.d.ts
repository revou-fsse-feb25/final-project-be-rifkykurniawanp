export declare class AssignmentResponseDto {
    id: number;
    lessonId: number;
    title: string;
    instructions: string;
    dueDate?: Date;
    createdAt: Date;
    lesson?: {
        id: number;
        title: string;
        slug?: string;
        type: string;
        module: {
            id: number;
            title: string;
            course: {
                id: number;
                title: string;
                slug: string;
                instructorId: number;
            };
        };
    };
    submissionCount: number;
    gradedSubmissionCount: number;
}
