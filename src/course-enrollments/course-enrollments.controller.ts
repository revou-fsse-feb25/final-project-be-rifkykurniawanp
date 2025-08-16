import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CourseEnrollmentsService } from './course-enrollments.service';
import { EnrollCourseDto } from './dto/request/enroll-course.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentResponseDto } from './dto/response/enrollment.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Course Enrollments')
@Controller('course-enrollments')
export class CourseEnrollmentsController {
  constructor(private readonly service: CourseEnrollmentsService) {}

  @UseGuards(JwtGuard)
  @Post(':paymentId')
  @ApiOperation({ summary: 'Enroll student to course' })
  @ApiResponse({ status: 201, type: EnrollmentResponseDto })
  enroll(@Param('paymentId') paymentId: number, @Body() dto: EnrollCourseDto) {
    return this.service.enroll(dto, paymentId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all course enrollments' })
  @ApiResponse({ status: 200, type: [EnrollmentResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'USER')
  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by id' })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Put(':id')
  @ApiOperation({ summary: 'Update enrollment' })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateEnrollmentDto) {
    return this.service.update(id, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete enrollment' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
