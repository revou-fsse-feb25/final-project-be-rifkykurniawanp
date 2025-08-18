import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { IssueCertificateDto } from './dto/request/issue-certificate.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CertificateResponseDto } from './dto/response/certificate.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { User as GetUser } from '../auth/decorator/user.decorator';
import { User, Certificate } from '@prisma/client';

@ApiTags('Certificates')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('certificates')
export class CertificatesController {
  constructor(private readonly service: CertificatesService) {}

  @Get()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Get all certificates' })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findAll(): Promise<CertificateResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'ADMIN/USER: Get certificate by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the certificate', type: Number })
  @ApiResponse({ status: 200, type: CertificateResponseDto })
  async findOne(@Param('id') id: number, @GetUser() user: User): Promise<CertificateResponseDto> {
    const certificate = await this.service.findOne(id);

    // Ensure the user is an ADMIN or the owner of the certificate
    if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to view this certificate.');
    }

    return certificate;
  }

  @Post('generate')
  @ApiOperation({ summary: 'SYSTEM: Generate a certificate' })
  @ApiResponse({ status: 201, type: CertificateResponseDto })
  @UseGuards() // Explicitly remove guards for this system endpoint
  async generateCertificate(@Body() dto: IssueCertificateDto): Promise<CertificateResponseDto> {
    // This is a system endpoint, typically called by a background job
    return this.service.generateCertificate(dto);
  }

  @Get('users/:userId')
  @ApiOperation({ summary: 'ADMIN/USER: Get certificates for a specific user' })
  @ApiParam({ name: 'userId', description: 'The unique ID of the user', type: Number })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findByUser(@Param('userId') userId: number, @GetUser() user: User): Promise<CertificateResponseDto[]> {
    // Allow ADMIN to get any user's certificates, or a user to get their own
    if (user.role !== 'ADMIN' && user.id !== userId) {
      throw new ForbiddenException('You do not have permission to view these certificates.');
    }
    return this.service.findByUser(userId);
  }

  @Get('courses/:courseId')
  @ApiOperation({ summary: 'ADMIN/INSTRUCTOR: Get certificates for a specific course' })
  @ApiParam({ name: 'courseId', description: 'The unique ID of the course', type: Number })
  @ApiResponse({ status: 200, type: [CertificateResponseDto] })
  async findByCourse(@Param('courseId') courseId: number, @GetUser() user: User): Promise<CertificateResponseDto[]> {
    // You'll need logic here to check if the user is an instructor for this course.
    // For now, assume this logic is in the service or a dedicated guard.
    if (user.role !== 'ADMIN' && user.role !== 'INSTRUCTOR') {
      throw new ForbiddenException('You do not have permission to view these certificates.');
    }
    return this.service.findByCourse(courseId, user);
  }

  @Get(':id/download')
  @ApiOperation({ summary: 'ADMIN/USER: Download certificate as PDF' })
  @ApiParam({ name: 'id', description: 'The unique ID of the certificate', type: Number })
  @ApiResponse({ status: 200, description: 'Certificate PDF file' })
  async downloadCertificate(@Param('id') id: number, @GetUser() user: User): Promise<any> {
    const certificate = await this.service.findOne(id);
    if (user.role !== 'ADMIN' && certificate.userId !== user.id) {
      throw new ForbiddenException('You do not have permission to download this certificate.');
    }
    return this.service.downloadPdf(id);
  }

  @Put(':id/verify')
  @ApiOperation({ summary: 'SYSTEM: Verify certificate eligibility' })
  @ApiParam({ name: 'id', description: 'The unique ID of the certificate', type: Number })
  @ApiResponse({ status: 200, description: 'Certificate eligibility verified' })
  @UseGuards() // Explicitly no guards for this system endpoint
  async verifyEligibility(@Param('id') id: number): Promise<CertificateResponseDto> {
    // This is a system endpoint, typically called by a background job
    return this.service.verifyEligibility(id);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'ADMIN: Delete certificate' })
  @ApiParam({ name: 'id', description: 'The unique ID of the certificate', type: Number })
  @ApiResponse({ status: 204, description: 'Certificate deleted successfully' })
  async remove(@Param('id') id: number): Promise<void> {
    return this.service.remove(id);
  }
}