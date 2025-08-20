import { EnrollmentStatus } from '../request/update-enrollment.dto';
export declare class EnrollmentResponseDto {
    id: number;
    courseId: number;
    studentId: number;
    paymentId: number;
    pricePaid: number;
    progress: number;
    certificateAwarded: boolean;
    status: EnrollmentStatus;
    enrolledAt: Date;
}
