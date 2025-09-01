export declare enum EnrollmentStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}
export declare class UpdateEnrollmentDto {
    status?: EnrollmentStatus;
    progress?: number;
    certificateAwarded?: boolean;
}
