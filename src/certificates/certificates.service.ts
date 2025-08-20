import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CertificatesRepository } from './certificates.repository';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { User } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private readonly repository: CertificatesRepository) {}

  private mapToResponseDto(cert: {
    id: number;
    enrollmentId: number;
    enrollment: { studentId: number; courseId: number };
    finalLessonsCompleted: boolean;
    finalAssignmentsCompleted: boolean;
    eligible: boolean;
    issuedAt: Date | null;
    certificateUrl: string | null;
  }): CertificateResponseDto {
    return {
      id: cert.id,
      enrollmentId: cert.enrollmentId,
      userId: cert.enrollment.studentId,
      courseId: cert.enrollment.courseId,
      finalLessonsCompleted: cert.finalLessonsCompleted,
      finalAssignmentsCompleted: cert.finalAssignmentsCompleted,
      eligible: cert.eligible,
      issuedAt: cert.issuedAt ?? undefined,
      certificateUrl: cert.certificateUrl ?? undefined,
    };
  }

  async findAll(): Promise<CertificateResponseDto[]> {
    const certificates = await this.repository.findAll();
    return certificates.map(this.mapToResponseDto);
  }

  async findOne(id: number): Promise<CertificateResponseDto> {
    const certificate = await this.repository.findOne(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    return this.mapToResponseDto(certificate);
  }

  async findByUser(userId: number): Promise<CertificateResponseDto[]> {
    const certificates = await this.repository.findByUser(userId);
    return certificates.map(this.mapToResponseDto);
  }

  async findByCourse(courseId: number, user: User): Promise<CertificateResponseDto[]> {
    const isInstructor = await this.repository.isUserInstructorForCourse(user.id, courseId);
    if (!isInstructor && user.role !== 'ADMIN') {
      throw new ForbiddenException('User is not an instructor for this course.');
    }
    const certificates = await this.repository.findByCourse(courseId);
    return certificates.map(this.mapToResponseDto);
  }

  async generateCertificate(dto: IssueCertificateDto): Promise<CertificateResponseDto> {
    const { enrollmentId } = dto;

    const existingCertificate = await this.repository.findByEnrollmentId(enrollmentId);
    if (existingCertificate) {
      throw new ConflictException('A certificate has already been issued for this enrollment.');
    }

    const eligibility = await this.checkEligibility(enrollmentId);
    if (!eligibility.eligible) {
      throw new BadRequestException('User is not eligible to receive this certificate.');
    }

    const certificate = await this.repository.create({
      ...eligibility,
      issuedAt: new Date(),
      enrollment: { connect: { id: enrollmentId } },
    });

    return this.mapToResponseDto(certificate);
  }

  async verifyEligibility(certificateId: number): Promise<CertificateResponseDto> {
    const certificate = await this.repository.findOne(certificateId);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${certificateId} not found.`);
    }

    const eligibility = await this.checkEligibility(certificate.enrollmentId);
    const updated = await this.repository.update(certificateId, { ...eligibility });

    return this.mapToResponseDto(updated);
  }

  async downloadPdf(id: number): Promise<any> {
    await this.findOne(id);
    return { message: 'PDF download initiated (mocked)' };
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.repository.findOne(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    await this.repository.remove(id);
  }

  private async checkEligibility(enrollmentId: number) {
    const progress = await this.repository.getCourseProgress(enrollmentId);
    return {
      finalLessonsCompleted: progress.finalLessonsCompleted,
      finalAssignmentsCompleted: progress.finalAssignmentsCompleted,
      eligible: progress.finalLessonsCompleted && progress.finalAssignmentsCompleted,
    };
  }
}
