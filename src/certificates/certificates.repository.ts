import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { Certificate } from '@prisma/client';

@Injectable()
export class CertificatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Certificate[]> {
    return this.prisma.certificate.findMany({ include: { enrollment: true } });
  }

  async findOne(id: number): Promise<Certificate | null> {
    return this.prisma.certificate.findUnique({ where: { id }, include: { enrollment: { include: { user: true } } } });
  }

  async findByEnrollmentId(enrollmentId: number): Promise<Certificate | null> {
    return this.prisma.certificate.findUnique({ where: { enrollmentId } });
  }

  async findByUser(userId: number): Promise<Certificate[]> {
    return this.prisma.certificate.findMany({ 
      where: { enrollment: { userId } }, 
      include: { enrollment: true } 
    });
  }

  async findByCourse(courseId: number): Promise<Certificate[]> {
    return this.prisma.certificate.findMany({ 
      where: { enrollment: { courseId } }, 
      include: { enrollment: true } 
    });
  }

  async create(data: any): Promise<Certificate> {
    return this.prisma.certificate.create({ data });
  }

  async update(id: number, data: any): Promise<Certificate> {
    return this.prisma.certificate.update({
      where: { id },
      data,
    });
  }

  async remove(id: number): Promise<void> {
    await this.prisma.certificate.delete({ where: { id } });
  }

  async isUserInstructorForCourse(userId: number, courseId: number): Promise<boolean> {
    // Implement logic to check if the user is an instructor for the course
    // e.g., check against a Course-Instructor join table.
    return true; // Placeholder
  }

  async getCourseProgress(enrollmentId: number): Promise<any> {
    // This method would query for lessons completed and assignments graded
    // for the given enrollmentId to determine eligibility.
    // Placeholder
    return {
      finalLessonsCompleted: true,
      finalAssignmentsCompleted: true,
    };
  }
}