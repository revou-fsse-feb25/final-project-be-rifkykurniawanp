import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Certificate, Prisma } from '@prisma/client';

@Injectable()
export class CertificatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  private readonly includeEnrollment = {
    enrollment: { select: { studentId: true, courseId: true } },
  };

  async findAll() {
    return this.prisma.certificate.findMany({
      include: this.includeEnrollment,
    });
  }

  async findOne(id: number) {
    return this.prisma.certificate.findUnique({
      where: { id },
      include: this.includeEnrollment,
    });
  }

  async findByEnrollmentId(enrollmentId: number) {
    return this.prisma.certificate.findUnique({
      where: { enrollmentId },
      include: this.includeEnrollment,
    });
  }

  async findByUser(studentId: number) {
    return this.prisma.certificate.findMany({
      where: { enrollment: { studentId } },
      include: this.includeEnrollment,
    });
  }

  async findByCourse(courseId: number) {
    return this.prisma.certificate.findMany({
      where: { enrollment: { courseId } },
      include: this.includeEnrollment,
    });
  }

  async create(data: Prisma.CertificateCreateInput) {
    return this.prisma.certificate.create({
      data,
      include: this.includeEnrollment,
    });
  }

  async update(id: number, data: Prisma.CertificateUpdateInput) {
    return this.prisma.certificate.update({
      where: { id },
      data,
      include: this.includeEnrollment,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.certificate.delete({ where: { id } });
  }

  async isUserInstructorForCourse(userId: number, courseId: number): Promise<boolean> {
    // TODO: implementasi nyata
    return true;
  }

  async getCourseProgress(enrollmentId: number) {
    return {
      finalLessonsCompleted: true,
      finalAssignmentsCompleted: true,
    };
  }
}
