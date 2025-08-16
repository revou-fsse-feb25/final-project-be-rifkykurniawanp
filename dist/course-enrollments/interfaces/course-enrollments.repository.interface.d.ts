import { EnrollCourseDto } from '../dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from '../dto/request/update-enrollment.dto';
export interface ICourseEnrollmentsRepository {
    enroll(dto: EnrollCourseDto): any;
    findAll(): any;
    findOne(id: number): any;
    update(id: number, dto: UpdateEnrollmentDto): any;
    remove(id: number): any;
}
