import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/request/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/request/update-enrollment.dto';
import { CompleteEnrollmentDto } from './dto/request/complete-enrollment.dto';
import { EnrollmentResponseDto } from './dto/response/enrollment-response.dto';
import { PaginatedEnrollmentResponseDto } from './dto/response/pagination-enrollment-response.dto';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly service: EnrollmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new enrollment' })
  @ApiResponse({ status: 201, type: EnrollmentResponseDto })
  create(@Body() dto: CreateEnrollmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: PaginatedEnrollmentResponseDto })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by ID' })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment by ID' })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateEnrollmentDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/complete')
  @ApiOperation({ summary: 'Complete enrollment and issue certificate' })
  @ApiResponse({ status: 200, type: EnrollmentResponseDto })
  complete(@Param('id') id: string, @Body() dto: CompleteEnrollmentDto) {
    return this.service.complete(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete enrollment by ID' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
