import { EnrollmentsRepository } from './course-enrollments.repository';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';
export declare class EnrollmentsService {
    private readonly repo;
    constructor(repo: EnrollmentsRepository);
    create(dto: EnrollCourseDto): Promise<EnrollmentResponseDto>;
    findAll(): Promise<EnrollmentResponseDto[]>;
    findOne(id: number): Promise<EnrollmentResponseDto>;
    update(id: number, dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto>;
    remove(id: number): Promise<void>;
}
