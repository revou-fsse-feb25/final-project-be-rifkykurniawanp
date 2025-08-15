import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';

@Injectable()
export class CertificatesRepository {
  constructor(private readonly prisma: PrismaService) {}

  issue(dto: IssueCertificateDto) {
    return this.prisma.certificate.create({ data: dto });
  }

  findAll() {
    return this.prisma.certificate.findMany({ include: { enrollment: true } });
  }

  findOne(id: number) {
    return this.prisma.certificate.findUnique({ where: { id }, include: { enrollment: true } });
  }

  remove(id: number) {
    return this.prisma.certificate.delete({ where: { id } });
  }
}
