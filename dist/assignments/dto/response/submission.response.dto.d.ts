export declare class SubmissionResponseDto {
    id: number;
    assignmentId: number;
    userId: number;
    content?: string;
    grade?: number;
    submittedAt: Date;
    user?: {
        id: number;
        email: string;
        firstName?: string;
        lastName?: string;
    };
    assignment?: {
        id: number;
        title: string;
        dueDate?: Date;
        lesson: {
            id: number;
            title: string;
            module: {
                id: number;
                title: string;
                course: {
                    id: number;
                    title: string;
                };
            };
        };
    };
}
