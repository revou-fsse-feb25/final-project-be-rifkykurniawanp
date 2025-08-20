export declare class AssignmentResponseDto {
    id: number;
    lessonId: number;
    title: string;
    instructions: string;
    dueDate?: Date | null;
    createdAt: Date;
    _count?: {
        submissions: number;
    };
    userSubmission?: {
        id: number;
        content?: string;
        grade?: number;
        submittedAt: Date;
    } | null;
}
export declare class AssignmentListResponseDto {
    assignments: AssignmentResponseDto[];
    total?: number;
    page?: number;
    limit?: number;
}
