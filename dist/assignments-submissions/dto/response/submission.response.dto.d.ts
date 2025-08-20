export declare class AssignmentSubmissionResponseDto {
    id: number;
    assignmentId: number;
    userId: number;
    content?: string | null;
    grade?: number | null;
    submittedAt: Date;
    user?: {
        id: number;
        firstName?: string;
        lastName?: string;
        email: string;
    };
    assignment?: {
        id: number;
        title: string;
        dueDate?: Date | null;
    };
}
export declare class AssignmentSubmissionListResponseDto {
    submissions: AssignmentSubmissionResponseDto[];
    total?: number;
    page?: number;
    limit?: number;
    stats?: {
        totalSubmissions: number;
        gradedSubmissions: number;
        averageGrade?: number;
    };
}
export declare class AssignmentSubmissionStatsDto {
    totalSubmissions: number;
    gradedSubmissions: number;
    pendingGrading: number;
    averageGrade?: number;
    highestGrade?: number;
    lowestGrade?: number;
}
