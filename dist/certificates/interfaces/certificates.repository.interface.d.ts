import { IssueCertificateDto } from '../dto/request/issue-certificate.dto';
export interface ICertificatesRepository {
    issue(dto: IssueCertificateDto): any;
    findAll(): any;
    findOne(id: number): any;
    remove(id: number): any;
}
