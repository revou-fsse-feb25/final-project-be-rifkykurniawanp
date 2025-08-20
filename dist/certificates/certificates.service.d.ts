import { CertificatesRepository } from './certificates.repository';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { User } from '@prisma/client';
export declare class CertificatesService {
    private readonly repository;
    constructor(repository: CertificatesRepository);
    private mapToResponseDto;
    findAll(): Promise<CertificateResponseDto[]>;
    findOne(id: number): Promise<CertificateResponseDto>;
    findByUser(userId: number): Promise<CertificateResponseDto[]>;
    findByCourse(courseId: number, user: User): Promise<CertificateResponseDto[]>;
    generateCertificate(dto: IssueCertificateDto): Promise<CertificateResponseDto>;
    verifyEligibility(certificateId: number): Promise<CertificateResponseDto>;
    downloadPdf(id: number): Promise<any>;
    remove(id: number): Promise<void>;
    private checkEligibility;
}
