import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';
import { CourseResponseDto } from './dto/response/course.response.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async create(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<CourseResponseDto> {
    // untuk sekarang belum inject currentUserId + role
    return this.coursesService.create(createCourseDto, 1, 'ADMIN');
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<CourseResponseDto[]> {
    return this.coursesService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CourseResponseDto> {
    return this.coursesService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ): Promise<CourseResponseDto> {
    return this.coursesService.update(Number(id), updateCourseDto, 1, 'ADMIN');
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.coursesService.remove(Number(id), 1, 'ADMIN');
  }
}
