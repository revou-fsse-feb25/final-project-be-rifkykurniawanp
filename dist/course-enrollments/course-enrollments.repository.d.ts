import { PrismaService } from '../prisma/prisma.service';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
export declare class CourseEnrollmentsRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    enroll(dto: EnrollCourseDto & {
        paymentId: number;
    }): import(".prisma/client").Prisma.Prisma__CourseEnrollmentClient<{
        id: number;
        courseId: number;
        paymentId: number;
        studentId: number;
        pricePaid: import("@prisma/client/runtime/library").Decimal;
        progress: number;
        certificateAwarded: boolean;
        enrolledAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
        };
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            userId: number;
            cartId: number;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        };
        certificate: {
            id: number;
            enrollmentId: number;
            finalLessonsCompleted: boolean;
            finalAssignmentsCompleted: boolean;
            eligible: boolean;
            issuedAt: Date | null;
            certificateUrl: string | null;
        } | null;
        student: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
        };
    } & {
        id: number;
        courseId: number;
        paymentId: number;
        studentId: number;
        pricePaid: import("@prisma/client/runtime/library").Decimal;
        progress: number;
        certificateAwarded: boolean;
        enrolledAt: Date;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__CourseEnrollmentClient<({
        course: {
            certificate: boolean;
            description: string | null;
            title: string;
            id: number;
            createdAt: Date;
            slug: string;
            price: import("@prisma/client/runtime/library").Decimal;
            category: import(".prisma/client").$Enums.CourseCategory;
            rating: import("@prisma/client/runtime/library").Decimal;
            syllabus: string | null;
            instructorId: number;
            students: number;
            duration: string | null;
            level: import(".prisma/client").$Enums.CourseLevel;
            language: string;
        };
        payment: {
            id: number;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            userId: number;
            cartId: number;
            amount: import("@prisma/client/runtime/library").Decimal;
            paymentMethod: string;
            payableType: import(".prisma/client").$Enums.PayableType;
            payableId: number;
            paidAt: Date | null;
        };
        certificate: {
            id: number;
            enrollmentId: number;
            finalLessonsCompleted: boolean;
            finalAssignmentsCompleted: boolean;
            eligible: boolean;
            issuedAt: Date | null;
            certificateUrl: string | null;
        } | null;
        student: {
            email: string;
            password: string;
            firstName: string | null;
            lastName: string | null;
            phone: string | null;
            address: string | null;
            role: import(".prisma/client").$Enums.RoleName;
            isBuyer: boolean;
            isStudent: boolean;
            id: number;
            createdAt: Date;
        };
    } & {
        id: number;
        courseId: number;
        paymentId: number;
        studentId: number;
        pricePaid: import("@prisma/client/runtime/library").Decimal;
        progress: number;
        certificateAwarded: boolean;
        enrolledAt: Date;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, dto: UpdateEnrollmentDto): import(".prisma/client").Prisma.Prisma__CourseEnrollmentClient<{
        id: number;
        courseId: number;
        paymentId: number;
        studentId: number;
        pricePaid: import("@prisma/client/runtime/library").Decimal;
        progress: number;
        certificateAwarded: boolean;
        enrolledAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__CourseEnrollmentClient<{
        id: number;
        courseId: number;
        paymentId: number;
        studentId: number;
        pricePaid: import("@prisma/client/runtime/library").Decimal;
        progress: number;
        certificateAwarded: boolean;
        enrolledAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
