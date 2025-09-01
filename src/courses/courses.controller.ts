import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UseGuards, Req, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBody, ApiParam, ApiQuery, ApiNotFoundResponse, ApiBadRequestResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Request } from 'express';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
    email: string;
  };
}

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // ========================= CREATE =========================
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiCreatedResponse({ description: 'The course has been successfully created.', type: CourseResponseDto })
  @ApiBadRequestResponse({ description: 'Course slug already exists' })
  @ApiBody({ type: CreateCourseDto })
  async create(
    @Body() createCourseDto: CreateCourseDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CourseResponseDto> {
    return this.coursesService.create(createCourseDto, req.user.id, req.user.role as any);
  }

  // ========================= GET ALL =========================
  @Get()
  @ApiOperation({ summary: 'Get all courses with pagination' })
  @ApiOkResponse({ description: 'A list of courses', type: [CourseResponseDto] })
  @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: 'number', example: 1 })
  @ApiQuery({ name: 'limit', required: false, description: 'Number of items per page', type: 'number', example: 10 })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<CourseResponseDto[]> {
    return this.coursesService.findAll(Number(page), Number(limit));
  }

  // ========================= GET BY ID =========================
  @Get(':id')
  @ApiOperation({ summary: 'Get a single course by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the course', type: 'number' })
  @ApiOkResponse({ description: 'The course with the given ID', type: CourseResponseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<CourseResponseDto> {
    return this.coursesService.findOne(id);
  }

  // ========================= GET BY SLUG =========================
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a course by its slug' })
  @ApiParam({ name: 'slug', description: 'The unique slug of the course', type: 'string' })
  @ApiOkResponse({ description: 'The course with the given slug', type: CourseResponseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async findBySlug(@Param('slug') slug: string): Promise<CourseResponseDto> {
    return this.coursesService.findBySlug(slug);
  }

  // ========================= GET BY INSTRUCTOR =========================
  @Get('instructor/:instructorId')
  @ApiOperation({ summary: 'Get all courses by an instructor ID' })
  @ApiParam({ name: 'instructorId', description: 'The unique ID of the instructor', type: 'number' })
  @ApiOkResponse({ description: 'A list of courses by the specified instructor', type: [CourseResponseDto] })
  async findByInstructorId(
    @Param('instructorId', ParseIntPipe) instructorId: number,
  ): Promise<CourseResponseDto[]> {
    return this.coursesService.findByInstructorId(instructorId);
  }

  // ========================= UPDATE =========================
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a course by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the course', type: 'number' })
  @ApiOkResponse({ description: 'The updated course', type: CourseResponseDto })
  @ApiBody({ type: UpdateCourseDto })
  @ApiNotFoundResponse({ description: 'Course not found' })
  @ApiBadRequestResponse({ description: 'Invalid input or slug already exists' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<CourseResponseDto> {
    return this.coursesService.update(id, updateCourseDto, req.user.id, req.user.role as any);
  }

  // ========================= SOFT DELETE =========================
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a course by ID' })
  @ApiParam({ name: 'id', description: 'The unique ID of the course', type: 'number' })
  @ApiOkResponse({ description: 'Course successfully deleted (soft delete)' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.coursesService.remove(id, req.user.id, req.user.role as any);
  }

  // ========================= FORCE DELETE =========================
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id/force')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Permanently delete a course by ID (Admin only)' })
  @ApiParam({ name: 'id', description: 'The unique ID of the course', type: 'number' })
  @ApiOkResponse({ description: 'Course permanently deleted' })
  @ApiNotFoundResponse({ description: 'Course not found' })
  async forceDelete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.coursesService.forceDelete(id, req.user.role as any);
  }

  // ========================= RESTORE =========================
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/restore')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft deleted course (Admin only)' })
  @ApiParam({ name: 'id', description: 'The unique ID of the course', type: 'number' })
  @ApiOkResponse({ description: 'Course successfully restored', type: CourseResponseDto })
  @ApiNotFoundResponse({ description: 'Deleted course not found' })
  async restore(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<CourseResponseDto> {
    return this.coursesService.restore(id, req.user.role as any);
  }
}
