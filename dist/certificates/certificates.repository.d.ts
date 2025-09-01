import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class CertificatesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly includeEnrollment;
    findAll(): Promise<({
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    })[]>;
    findOne(id: number): Promise<({
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }) | null>;
    findByEnrollmentId(enrollmentId: number): Promise<({
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }) | null>;
    findByUser(studentId: number): Promise<({
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    })[]>;
    findByCourse(courseId: number): Promise<({
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    })[]>;
    create(data: Prisma.CertificateCreateInput): Promise<{
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }>;
    update(id: number, data: Prisma.CertificateUpdateInput): Promise<{
        enrollment: {
            courseId: number;
            studentId: number;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }>;
    remove(id: number): Promise<void>;
    isUserInstructorForCourse(userId: number, courseId: number): Promise<boolean>;
    getCourseProgress(enrollmentId: number): Promise<{
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
    }>;
}
