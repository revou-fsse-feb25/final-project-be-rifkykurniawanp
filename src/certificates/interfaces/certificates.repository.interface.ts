import { IssueCertificateDto } from '../dto/request/issue-certificate.dto';

export interface ICertificatesRepository {
  issue(dto: IssueCertificateDto);
  findAll();
  findOne(id: number);
  remove(id: number);
}
