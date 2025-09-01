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
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { LessonResponseDto } from './dto/response/lesson.response.dto';
import { ApiTags, ApiOperation, ApiOkResponse, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Lessons')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('lessons')
export class LessonsController {
  constructor(private readonly service: LessonsService) {}

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiCreatedResponse({ type: LessonResponseDto })
  create(
    @Body() createDto: CreateLessonDto,
    @Body('moduleId', ParseIntPipe) moduleId: number,
  ): Promise<LessonResponseDto> {
    return this.service.create(createDto, moduleId);
  }

  @Get('module/:moduleId')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get all lessons of a module' })
  @ApiOkResponse({ type: [LessonResponseDto] })
  findAll(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.service.findAll(moduleId);
  }

  @Get(':id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get lesson by ID' })
  @ApiOkResponse({ type: LessonResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Update a lesson by ID' })
  @ApiOkResponse({ type: LessonResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateLessonDto,
  ) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Soft delete a lesson by ID' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Delete(':id/force')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Force delete a lesson by ID' })
  forceDelete(@Param('id', ParseIntPipe) id: number) {
    return this.service.forceDelete(id);
  }

  @Patch(':id/restore')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Restore a soft deleted lesson by ID' })
  restore(@Param('id', ParseIntPipe) id: number) {
    return this.service.restore(id);
  }
}
