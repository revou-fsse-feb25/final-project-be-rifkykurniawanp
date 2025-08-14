import { Module } from '@nestjs/common';
import { CertificatesController } from './certificates.controller';
import { CertificatesService } from './certificates.service';
import { CertificatesRepository } from './certificates.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { CERTIFICATES_REPOSITORY } from './interface/certificates.repository.interface';

@Module({
  imports: [PrismaModule],
  controllers: [CertificatesController],
  providers: [
    CertificatesService,
    { provide: CERTIFICATES_REPOSITORY, useClass: CertificatesRepository },
  ],
  exports: [CertificatesService],
})
export class CertificatesModule {}
