import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { UpdateCertificateDto } from './dto/request/update-certificate.dto';
import { ICertificatesRepository } from './interface/certificates.repository.interface';

@Injectable()
export class CertificatesRepository implements ICertificatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: IssueCertificateDto & { issuedAt?: Date | null }) {
    return this.prisma.certificate.create({ data });
  }

  findAll() {
    return this.prisma.certificate.findMany({
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number) {
    return this.prisma.certificate.findUnique({ where: { id } });
  }

  update(id: number, data: UpdateCertificateDto) {
    return this.prisma.certificate.update({
      where: { id },
      data,
    });
  }

  delete(id: number) {
    return this.prisma.certificate.delete({ where: { id } });
  }
}
