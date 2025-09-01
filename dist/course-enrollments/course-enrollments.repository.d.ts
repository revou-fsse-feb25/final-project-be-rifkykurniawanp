import { PrismaService } from '../prisma/prisma.service';
import { IEnrollmentRepository } from './interfaces/enrollment-repository.interface';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';
export declare class EnrollmentsRepository implements IEnrollmentRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toResponse;
    create(dto: EnrollCourseDto & {
        pricePaid: number;
    }): Promise<EnrollmentResponseDto>;
    findAll(): Promise<EnrollmentResponseDto[]>;
    findById(id: number): Promise<EnrollmentResponseDto | null>;
    update(id: number, dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto>;
    remove(id: number): Promise<void>;
}
