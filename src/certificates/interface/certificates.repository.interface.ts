import { Certificate } from '@prisma/client';
import { IssueCertificateDto } from '../dto/request/issue-certificate.dto';
import { UpdateCertificateDto } from '../dto/request/update-certificate.dto';

export const CERTIFICATES_REPOSITORY = Symbol('CERTIFICATES_REPOSITORY');

export interface ICertificatesRepository {
  create(data: IssueCertificateDto & { issuedAt?: Date | null }): Promise<Certificate>;
  findAll(): Promise<Certificate[]>;
  findById(id: number): Promise<Certificate | null>;
  update(id: number, data: UpdateCertificateDto): Promise<Certificate>;
  delete(id: number): Promise<Certificate>;
}
