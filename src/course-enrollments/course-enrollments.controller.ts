import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './course-enrollments.service';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Enrollments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  @Roles('ADMIN', 'USER') // contoh: siapa saja yang bisa enroll
  @ApiOperation({ summary: 'Enroll a student in a course' })
  @ApiResponse({ status: 201, type: EnrollmentResponseDto })
  create(@Body() dto: EnrollCourseDto): Promise<EnrollmentResponseDto> {
    return this.service.create(dto);
  }

  @Get()
  @Roles('ADMIN') // hanya admin
  @ApiOperation({ summary: 'Get all enrollments (ADMIN only)' })
  @ApiResponse({ status: 200, type: [EnrollmentResponseDto] })
  findAll(): Promise<EnrollmentResponseDto[]> {
    return this.service.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'USER', 'INSTRUCTOR') // siapa saja yang boleh lihat
  @ApiOperation({ summary: 'Get enrollment by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EnrollmentResponseDto> {
    return this.service.findOne(id);
  }

  @Put(':id')
  @Roles('ADMIN', 'INSTRUCTOR') // siapa yang bisa update
  @ApiOperation({ summary: 'Update enrollment status' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEnrollmentDto,
  ): Promise<EnrollmentResponseDto> {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @Roles('ADMIN') // hanya admin
  @ApiOperation({ summary: 'Delete enrollment (ADMIN only)' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Enrollment deleted successfully' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.remove(id);
  }
}
