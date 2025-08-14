import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CertificatesService } from './certificates.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { UpdateCertificateDto } from './dto/request/update-certificate.dto';
import { CertificateResponseDto } from './dto/response/certificate-response.dto';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @Post()
  @ApiOperation({ summary: 'Issue a new certificate' })
  @ApiResponse({ status: 201, type: CertificateResponseDto })
  issue(@Body() dto: IssueCertificateDto) {
    return this.service.issue(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all certificates' })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get certificate by ID' })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.service.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update certificate' })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateCertificateDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete certificate' })
  @ApiResponse({ status: 200, description: 'Certificate deleted successfully' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.service.delete(id);
  }
}
