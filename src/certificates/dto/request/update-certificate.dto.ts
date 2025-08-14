import { PartialType } from '@nestjs/swagger';
import { IssueCertificateDto } from './issue-certificate.dto';

export class UpdateCertificateDto extends PartialType(IssueCertificateDto) {}
