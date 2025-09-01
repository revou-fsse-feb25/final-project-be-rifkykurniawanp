export declare class CertificateResponseDto {
    id: number;
    enrollmentId: number;
    userId: number;
    courseId: number;
    finalLessonsCompleted: boolean;
    finalAssignmentsCompleted: boolean;
    eligible: boolean;
    issuedAt?: Date;
    certificateUrl?: string;
}
