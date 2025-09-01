import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  ForbiddenException,
  ParseIntPipe,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { User as GetUser } from '../auth/decorator/user.decorator';
import { User } from '@prisma/client';

@ApiTags('Certificates')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  // ================= ADMIN =================

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Get all certificates' })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findAll(): Promise<CertificateResponseDto[]> {
    return this.service.findAll();
  }

  // ================= ADMIN / USER =================

  @Get(':id')
  @ApiOperation({ summary: 'ADMIN/USER: Get certificate by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<CertificateResponseDto> {
    const certificate = await this.service.findOne(id);

    // validasi kepemilikan berbasis DTO (userId sudah dimap dari enrollment.studentId)
    if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to view this certificate.',
      );
    }

    return certificate;
  }

  @Post('generate')
  @ApiOperation({ summary: 'SYSTEM/INTERNAL: Generate a certificate' })
  @ApiResponse({ status: 201, type: CertificateResponseDto })
  async generateCertificate(
    @Body() dto: IssueCertificateDto,
  ): Promise<CertificateResponseDto> {
    // note: endpoint ini saat ini tetap diproteksi JwtGuard di level controller
    return this.service.generateCertificate(dto);
  }

  @Get('users/:userId')
  @ApiOperation({ summary: 'ADMIN/USER: Get certificates for a specific user' })
  @ApiParam({ name: 'userId', type: Number })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findByUser(
    @Param('userId', ParseIntPipe) userId: number,
    @GetUser() user: User,
  ): Promise<CertificateResponseDto[]> {
    if (user.role !== 'ADMIN' && user.id !== userId) {
      throw new ForbiddenException(
        'You do not have permission to view these certificates.',
      );
    }
    return this.service.findByUser(userId);
  }

  @Get('courses/:courseId')
  @ApiOperation({ summary: 'ADMIN/INSTRUCTOR: Get certificates for a specific course' })
  @ApiParam({ name: 'courseId', type: Number })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findByCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @GetUser() user: User,
  ): Promise<CertificateResponseDto[]> {
    if (user.role !== 'ADMIN' && user.role !== 'INSTRUCTOR') {
      throw new ForbiddenException(
        'You do not have permission to view these certificates.',
      );
    }
    return this.service.findByCourse(courseId, user);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'ADMIN/USER: Download certificate as PDF' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Certificate PDF file (mocked)' })
  async downloadCertificate(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<any> {
    const certificate = await this.service.findOne(id);

    if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
      throw new ForbiddenException(
        'You do not have permission to download this certificate.',
      );
    }
    return this.service.downloadPdf(id);
  }

  @Put(':id/verify')
  @ApiOperation({ summary: 'SYSTEM/INTERNAL: Verify certificate eligibility' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  async verifyEligibility(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CertificateResponseDto> {
    // note: endpoint ini saat ini tetap diproteksi JwtGuard di level controller
    return this.service.verifyEligibility(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Delete certificate' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Certificate deleted successfully' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
