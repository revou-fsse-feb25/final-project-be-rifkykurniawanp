import {
  Controller, Get, Post, Body, Put, Param, Delete,
  ParseIntPipe, HttpCode, HttpStatus, UseGuards, Request,
} from '@nestjs/common';
import {
  ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth,
} from '@nestjs/swagger';
import { CourseModulesService } from './course-modules.service';
import { CreateModuleDto } from './dto/request/create-module.dto';
import { UpdateModuleDto } from './dto/request/update-module.dto';
import { ModuleResponseDto } from './dto/response/module.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Course Modules & Lessons')
@Controller('api')
@ApiBearerAuth()
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @Get('courses/:courseId/modules')
  @ApiOperation({ summary: 'Get course modules' })
  @ApiParam({ name: 'courseId', description: 'Course ID', type: Number })
  @ApiResponse({ status: 200, description: 'Course modules retrieved successfully', type: [ModuleResponseDto] })
  async getCourseModules(@Param('courseId', ParseIntPipe) courseId: number, @Request() req: any) {
    return await this.courseModulesService.findByCourseWithAccess(courseId, req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @Get('modules/:id')
  @ApiOperation({ summary: 'Get module by ID' })
  @ApiParam({ name: 'id', description: 'Module ID', type: Number })
  @ApiResponse({ status: 200, description: 'Module retrieved successfully', type: ModuleResponseDto })
  async getModule(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return await this.courseModulesService.findOneWithAccess(id, req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Post('courses/:courseId/modules')
  @ApiOperation({ summary: 'Create new module' })
  @ApiParam({ name: 'courseId', description: 'Course ID', type: Number })
  @ApiBody({ type: CreateModuleDto })
  @ApiResponse({ status: 201, description: 'Module created successfully', type: ModuleResponseDto })
  async createModule(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() createModuleDto: CreateModuleDto,
    @Request() req: any,
  ) {
    return await this.courseModulesService.createForCourse(courseId, createModuleDto, req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Put('modules/:id')
  @ApiOperation({ summary: 'Update module' })
  @ApiParam({ name: 'id', description: 'Module ID', type: Number })
  @ApiBody({ type: UpdateModuleDto })
  @ApiResponse({ status: 200, description: 'Module updated successfully', type: ModuleResponseDto })
  async updateModule(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateModuleDto: UpdateModuleDto,
    @Request() req: any,
  ) {
    return await this.courseModulesService.updateWithOwnership(id, updateModuleDto, req.user);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Delete('modules/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete module' })
  @ApiParam({ name: 'id', description: 'Module ID', type: Number })
  @ApiResponse({ status: 204, description: 'Module deleted successfully' })
  async deleteModule(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return await this.courseModulesService.removeWithOwnership(id, req.user);
  }
}
