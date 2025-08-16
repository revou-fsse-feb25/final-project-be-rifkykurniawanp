import { PrismaService } from '../prisma/prisma.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
export declare class CertificatesRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    issue(dto: IssueCertificateDto): import(".prisma/client").Prisma.Prisma__CertificateClient<{
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        enrollment: {
            id: number;
            courseId: number;
            paymentId: number;
            studentId: number;
            pricePaid: import("@prisma/client/runtime/library").Decimal;
            progress: number;
            certificateAwarded: boolean;
            enrolledAt: Date;
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CertificateClient<({
        enrollment: {
            id: number;
            courseId: number;
            paymentId: number;
            studentId: number;
            pricePaid: import("@prisma/client/runtime/library").Decimal;
            progress: number;
            certificateAwarded: boolean;
            enrolledAt: Date;
        };
    } & {
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CertificateClient<{
        id: number;
        enrollmentId: number;
        finalLessonsCompleted: boolean;
        finalAssignmentsCompleted: boolean;
        eligible: boolean;
        issuedAt: Date | null;
        certificateUrl: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
