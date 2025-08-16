import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { LessonProgressesService } from './lesson-progresses.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LessonProgressResponseDto } from './dto/response/lesson-progress.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Lesson Progresses')
@Controller('lesson-progresses')
export class LessonProgressesController {
  constructor(private readonly service: LessonProgressesService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @Get(':userId')
  @ApiOperation({ summary: 'Get all lesson progresses for a user' })
  @ApiResponse({ status: 200, type: [LessonProgressResponseDto] })
  getAllByUser(@Param('userId') userId: number) {
    return this.service.getAllByUser(userId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('USER')
  @Post(':userId/:lessonId/complete')
  @ApiOperation({ summary: 'Mark lesson as completed' })
  @ApiResponse({ status: 200, type: LessonProgressResponseDto })
  markCompleted(@Param('userId') userId: number, @Param('lessonId') lessonId: number) {
    return this.service.markCompleted(userId, lessonId);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @Get(':userId/:lessonId')
  @ApiOperation({ summary: 'Get lesson progress by user and lesson' })
  @ApiResponse({ status: 200, type: LessonProgressResponseDto })
  getProgress(@Param('userId') userId: number, @Param('lessonId') lessonId: number) {
    return this.service.getProgress(userId, lessonId);
  }
}
