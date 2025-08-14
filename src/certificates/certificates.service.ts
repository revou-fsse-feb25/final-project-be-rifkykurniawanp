import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import {
  CERTIFICATES_REPOSITORY,
  ICertificatesRepository,
} from './interface/certificates.repository.interface';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { UpdateCertificateDto } from './dto/request/update-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(
    @Inject(CERTIFICATES_REPOSITORY)
    private readonly repo: ICertificatesRepository,
  ) {}

  async issue(dto: IssueCertificateDto) {
    // optional guard: enforce eligibility before issuing
    if (!dto.eligible) {
      throw new BadRequestException('Enrollment is not eligible for certificate');
    }

    // auto-set issuedAt when eligible
    const issuedAt = new Date();

    return this.repo.create({ ...dto, issuedAt });
  }

  findAll() {
    return this.repo.findAll();
  }

  async findById(id: number) {
    const cert = await this.repo.findById(id);
    if (!cert) throw new NotFoundException(`Certificate with ID ${id} not found`);
    return cert;
  }

  async update(id: number, dto: UpdateCertificateDto) {
    await this.findById(id);
    return this.repo.update(id, dto);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.repo.delete(id);
  }
}
