import { Module } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { CertificatesController } from './certificates.controller';
import { CertificatesRepository } from './certificates.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [CertificatesController],
  providers: [CertificatesService, CertificatesRepository, PrismaService],
  exports: [CertificatesService],
})
export class CertificatesModule {}
