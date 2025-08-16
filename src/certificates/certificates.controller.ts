import { Controller, Get, Post, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Post()
  @ApiOperation({ summary: 'Issue certificate' })
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
  @ApiOperation({ summary: 'Get certificate by id' })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete certificate' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
