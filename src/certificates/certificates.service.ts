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
import { User, Certificate } from '@prisma/client';

@Injectable()
export class CertificatesService {
  constructor(private readonly repository: CertificatesRepository) {}

  async findAll(): Promise<CertificateResponseDto[]> {
    return this.repository.findAll();
  }

  async findOne(id: number): Promise<CertificateResponseDto> {
    const certificate = await this.repository.findOne(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    return certificate;
  }

  async findByUser(userId: number): Promise<CertificateResponseDto[]> {
    return this.repository.findByUser(userId);
  }

  async findByCourse(courseId: number, user: User): Promise<CertificateResponseDto[]> {
    const isInstructor = await this.repository.isUserInstructorForCourse(user.id, courseId);
    if (!isInstructor && user.role !== 'ADMIN') {
        throw new ForbiddenException('User is not an instructor for this course.');
    }
    return this.repository.findByCourse(courseId);
  }

  async generateCertificate(dto: IssueCertificateDto): Promise<CertificateResponseDto> {
    const { enrollmentId } = dto;
    
    // Check if a certificate for this enrollment already exists
    const existingCertificate = await this.repository.findByEnrollmentId(enrollmentId);
    if (existingCertificate) {
      throw new ConflictException('A certificate has already been issued for this enrollment.');
    }

    // Check enrollment eligibility
    const eligibility = await this.checkEligibility(enrollmentId);
    if (!eligibility.eligible) {
      throw new BadRequestException('User is not eligible to receive this certificate.');
    }

    const certificateData = {
      enrollmentId,
      ...eligibility,
      issuedAt: new Date(),
    };

    return this.repository.create(certificateData);
  }

  async verifyEligibility(certificateId: number): Promise<CertificateResponseDto> {
    const certificate = await this.findOne(certificateId);
    const eligibility = await this.checkEligibility(certificate.enrollmentId);

    return this.repository.update(certificateId, { ...eligibility });
  }

  async downloadPdf(id: number): Promise<any> {
    const certificate = await this.findOne(id);
    // Placeholder logic for PDF generation.
    console.log(`Downloading PDF for certificate ${id}`);
    return { message: 'PDF download initiated (mocked)' };
  }

  async remove(id: number): Promise<void> {
    const certificate = await this.findOne(id);
    if (!certificate) {
      throw new NotFoundException(`Certificate with ID ${id} not found.`);
    }
    await this.repository.remove(id);
  }

  private async checkEligibility(enrollmentId: number): Promise<{
    finalLessonsCompleted: boolean;
    finalAssignmentsCompleted: boolean;
    eligible: boolean;
  }> {
    // This is where you would implement your eligibility logic
    // based on the `finalLessonsCompleted` and `finalAssignmentsCompleted` criteria.
    const courseProgress = await this.repository.getCourseProgress(enrollmentId);
    const finalLessonsCompleted = courseProgress.finalLessonsCompleted;
    const finalAssignmentsCompleted = courseProgress.finalAssignmentsCompleted;
    const eligible = finalLessonsCompleted && finalAssignmentsCompleted;
    
    return {
      finalLessonsCompleted,
      finalAssignmentsCompleted,
      eligible,
    };
  }
}