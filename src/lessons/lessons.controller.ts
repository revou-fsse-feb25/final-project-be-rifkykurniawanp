import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/request/create-lesson.dto';
import { UpdateLessonDto } from './dto/request/update-lesson.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RoleName } from '@prisma/client';

@Controller()
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  // ================= ADMIN / INSTRUCTOR =================

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.INSTRUCTOR)
  @Post('api/modules/:moduleId/lessons')
  create(
    @Param('moduleId', ParseIntPipe) moduleId: number,
    @Body() dto: CreateLessonDto,
  ) {
    return this.lessonsService.create({ ...dto, moduleId });
  }

  @Get('api/modules/:moduleId/lessons')
  findAllByModule(@Param('moduleId', ParseIntPipe) moduleId: number) {
    return this.lessonsService.findAllByModule(moduleId);
  }

  @Get('api/lessons/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.findOne(id);
  }

  @Get('api/lessons/slug/:slug')
  findBySlug(@Param('slug') slug: string) {
    return this.lessonsService.findBySlug(slug);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.INSTRUCTOR)
  @Patch('api/lessons/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateLessonDto,
  ) {
    return this.lessonsService.update(id, dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(RoleName.ADMIN, RoleName.INSTRUCTOR)
  @Delete('api/lessons/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.lessonsService.remove(id);
  }

  // ================= USER PROGRESS =================

  @UseGuards(JwtGuard)
  @Get('api/lessons/:lessonId/progress')
  getProgress(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.lessonsService.getProgress(lessonId, userId);
  }

  @UseGuards(JwtGuard)
  @Post('api/lessons/:lessonId/complete')
  completeLesson(
    @Param('lessonId', ParseIntPipe) lessonId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.lessonsService.completeLesson(lessonId, userId);
  }

  @UseGuards(JwtGuard)
  @Get('api/courses/:courseId/progress')
  getCourseProgress(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Req() req: any,
  ) {
    const userId = req.user.id;
    return this.lessonsService.getCourseProgress(courseId, userId);
  }
}
