// src/courses/courses.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';
import { CourseCategory, CourseLevel } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, type: CourseResponseDto })
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.coursesService.create(createCourseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get list of courses' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'category', required: false, enum: CourseCategory })
  @ApiQuery({ name: 'level', required: false, enum: CourseLevel })
  @ApiResponse({ status: 200, type: [CourseResponseDto] })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('category') category?: CourseCategory,
    @Query('level') level?: CourseLevel,
  ) {
    return this.coursesService.findAll(page, limit, { category, level });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get course by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update course by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: CourseResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.coursesService.update(id, updateCourseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete course by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.coursesService.remove(id);
  }
}
