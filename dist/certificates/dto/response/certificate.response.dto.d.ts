export declare class CertificateResponseDto {
    id: number;
    enrollmentId: number;
    finalLessonsCompleted: boolean;
    finalAssignmentsCompleted: boolean;
    eligible: boolean;
    issuedAt?: Date;
    certificateUrl?: string;
}
