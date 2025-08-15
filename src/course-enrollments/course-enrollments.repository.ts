import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';

@Injectable()
export class CourseEnrollmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  enroll(dto: EnrollCourseDto & { paymentId: number }) {
    return this.prisma.courseEnrollment.create({ data: { ...dto, paymentId: dto.paymentId } });
  }

  findAll() {
    return this.prisma.courseEnrollment.findMany({ include: { course: true, student: true, payment: true, certificate: true } });
  }

  findOne(id: number) {
    return this.prisma.courseEnrollment.findUnique({ where: { id }, include: { course: true, student: true, payment: true, certificate: true } });
  }

  update(id: number, dto: UpdateEnrollmentDto) {
    return this.prisma.courseEnrollment.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.courseEnrollment.delete({ where: { id } });
  }
}
