import { CertificatesService } from './certificates.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { User } from '@prisma/client';
export declare class CertificatesController {
    private readonly service;
    constructor(service: CertificatesService);
    findAll(): Promise<CertificateResponseDto[]>;
    findOne(id: number, user: User): Promise<CertificateResponseDto>;
    generateCertificate(dto: IssueCertificateDto): Promise<CertificateResponseDto>;
    findByUser(userId: number, user: User): Promise<CertificateResponseDto[]>;
    findByCourse(courseId: number, user: User): Promise<CertificateResponseDto[]>;
    downloadCertificate(id: number, user: User): Promise<any>;
    verifyEligibility(id: number): Promise<CertificateResponseDto>;
    remove(id: number): Promise<void>;
}
