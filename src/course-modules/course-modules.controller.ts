import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/request/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/request/update-course-module.dto';
import { CourseModuleResponseDto } from './dto/response/course-module.response.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Course Modules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly service: CourseModulesService) {}

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR') // siapa saja yang boleh create
  @ApiOperation({ summary: 'Create a new course module' })
  @ApiCreatedResponse({ type: CourseModuleResponseDto })
  create(
    @Body() createDto: CreateCourseModuleDto,
    @Body('courseId', ParseIntPipe) courseId: number,
  ): Promise<CourseModuleResponseDto> {
    return this.service.create(createDto, courseId);
  }

  @Get('course/:courseId')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER') // siapa saja yang boleh lihat modules
  @ApiOperation({ summary: 'Get all modules of a course' })
  @ApiOkResponse({ type: [CourseModuleResponseDto] })
  findAll(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.service.findAll(courseId);
  }

  @Get(':id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get course module by ID' })
  @ApiOkResponse({ type: CourseModuleResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Update a course module by ID' })
  @ApiOkResponse({ type: CourseModuleResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateCourseModuleDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Soft delete a course module by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Delete(':id/force')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Force delete a course module by ID' })
  forceDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.forceDelete(id);
  }

  @Patch(':id/restore')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Restore a soft deleted course module by ID' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
