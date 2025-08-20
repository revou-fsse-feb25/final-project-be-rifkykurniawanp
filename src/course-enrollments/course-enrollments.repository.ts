import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IEnrollmentRepository } from './interfaces/enrollment-repository.interface';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';
import { EnrollmentStatus } from './dto/request/update-enrollment.dto';
import { CourseEnrollment } from '@prisma/client';

@Injectable()
export class EnrollmentsRepository implements IEnrollmentRepository {
  constructor(private readonly prisma: PrismaService) {}

  private toResponse(entity: CourseEnrollment): EnrollmentResponseDto {
    return {
      id: entity.id,
      courseId: entity.courseId,
      studentId: entity.studentId,
      paymentId: entity.paymentId,
      pricePaid: entity.pricePaid.toNumber(), // ✅ convert Decimal → number
      progress: entity.progress,
      certificateAwarded: entity.certificateAwarded,
      status: EnrollmentStatus.ACTIVE, // sementara hardcode
      enrolledAt: entity.enrolledAt,
    };
  }

  async create(dto: EnrollCourseDto & { pricePaid: number }): Promise<EnrollmentResponseDto> {
    const created = await this.prisma.courseEnrollment.create({
      data: {
        ...dto,
        pricePaid: dto.pricePaid, // Prisma auto-cast ke Decimal
      },
    });
    return this.toResponse(created);
  }

  async findAll(): Promise<EnrollmentResponseDto[]> {
    const records = await this.prisma.courseEnrollment.findMany();
    return records.map((r) => this.toResponse(r));
  }

  async findById(id: number): Promise<EnrollmentResponseDto | null> {
    const record = await this.prisma.courseEnrollment.findUnique({ where: { id } });
    return record ? this.toResponse(record) : null; // ✅ handle null
  }

  async update(id: number, dto: UpdateEnrollmentDto): Promise<EnrollmentResponseDto> {
    const updated = await this.prisma.courseEnrollment.update({
      where: { id },
      data: {
        ...(dto.progress !== undefined && { progress: dto.progress }),
        ...(dto.certificateAwarded !== undefined && { certificateAwarded: dto.certificateAwarded }),
      },
    });
    return this.toResponse(updated);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.courseEnrollment.delete({ where: { id } });
  }
}
