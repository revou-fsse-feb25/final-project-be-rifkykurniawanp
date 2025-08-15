import { Injectable } from '@nestjs/common';
import { CertificatesRepository } from './certificates.repository';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';

@Injectable()
export class CertificatesService {
  constructor(private readonly repository: CertificatesRepository) {}

  issue(dto: IssueCertificateDto) {
    return this.repository.issue(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  remove(id: number) {
    return this.repository.remove(id);
  }
}
