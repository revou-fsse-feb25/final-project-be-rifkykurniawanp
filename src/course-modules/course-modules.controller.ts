import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { CourseModulesService } from './course-modules.service';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { ModuleResponseDto } from './dto/response/module.response.dto';

@ApiTags('Course Modules')
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new course module' })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({
    status: 201,
    description: 'Course module created successfully',
    type: ModuleResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data or course not found',
  })
  async create(@Body() createModuleDto: CreateModuleDto) {
    return await this.courseModulesService.create(createModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all course modules' })
  @ApiQuery({
    name: 'courseId',
    required: false,
    description: 'Filter by course ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'List of course modules retrieved successfully',
    type: [ModuleResponseDto],
  })
  async findAll(@Query('courseId', ParseIntPipe) courseId?: number) {
    if (courseId) {
      return await this.courseModulesService.findByCourse(courseId);
    }
    return await this.courseModulesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a course module by ID' })
  @ApiParam({
    name: 'id',
    description: 'Course module ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Course module retrieved successfully',
    type: ModuleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Course module not found',
  })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.courseModulesService.findOne(id);
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all modules for a specific course' })
  @ApiParam({
    name: 'courseId',
    description: 'Course ID',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Course modules retrieved successfully',
    type: [ModuleResponseDto],
  })
  async findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return await this.courseModulesService.findByCourse(courseId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a course module' })
  @ApiParam({
    name: 'id',
    description: 'Course module ID',
    type: Number,
  })
  @ApiBody({ type: UpdateModuleDto })
  @ApiResponse({
    status: 200,
    description: 'Course module updated successfully',
    type: ModuleResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Course module not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data or course not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModuleDto: UpdateModuleDto,
  ) {
    return await this.courseModulesService.update(id, updateModuleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a course module' })
  @ApiParam({
    name: 'id',
    description: 'Course module ID',
    type: Number,
  })
  @ApiResponse({
    status: 204,
    description: 'Course module deleted successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'Course module not found',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.courseModulesService.remove(id);
  }
}