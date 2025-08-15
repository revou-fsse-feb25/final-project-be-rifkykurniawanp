import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LessonResponseDto } from './dto/response/lesson.response.dto';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, description: 'Lesson created', type: LessonResponseDto })
  create(@Body() dto: CreateLessonDto) {
    return this.lessonsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, description: 'List of lessons', type: [LessonResponseDto] })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by id' })
  @ApiResponse({ status: 200, description: 'Lesson details', type: LessonResponseDto })
  findOne(@Param('id') id: number) {
    return this.lessonsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiResponse({ status: 200, description: 'Updated lesson', type: LessonResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateLessonDto) {
    return this.lessonsService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiResponse({ status: 200, description: 'Deleted lesson' })
  remove(@Param('id') id: number) {
    return this.lessonsService.remove(id);
  }
}
