// src/assignments/assignments.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';
import { SubmissionResponseDto } from './dto/response/submission.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Assignments')
@Controller('assignments')
@UseGuards(JwtGuard, RolesGuard)
@ApiBearerAuth()
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // ================= ASSIGNMENT ENDPOINTS =================
  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, type: AssignmentResponseDto })
  create(@Body() dto: CreateAssignmentDto, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.create(dto, user.sub, user.role);
  }

  @Get()
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Get all assignments with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [AssignmentResponseDto] })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const { user } = req;
    return this.assignmentsService.findAll(pageNum, limitNum, user.role);
  }

  @Get('deleted')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get soft deleted assignments (Admin only)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, type: [AssignmentResponseDto] })
  getDeleted(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Request() req?: any,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    const { user } = req;
    return this.assignmentsService.getDeleted(pageNum, limitNum, user.role);
  }

  @Get('lesson/:lessonId')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get assignments by lesson ID' })
  @ApiParam({ name: 'lessonId', example: 1 })
  @ApiResponse({ status: 200, type: [AssignmentResponseDto] })
  findByLesson(@Param('lessonId', ParseIntPipe) lessonId: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.findByLesson(lessonId, user.sub, user.role);
  }

  @Get('course/:courseId')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get assignments by course ID' })
  @ApiParam({ name: 'courseId', example: 1 })
  @ApiResponse({ status: 200, type: [AssignmentResponseDto] })
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.findByCourse(courseId, user.sub, user.role);
  }

  @Get(':id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get an assignment by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.findOne(id, user.sub, user.role);
  }

  @Patch(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssignmentDto,
    @Request() req: any,
  ) {
    const { user } = req;
    return this.assignmentsService.update(id, dto, user.sub, user.role);
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Soft delete an assignment' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204 })
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.remove(id, user.sub, user.role);
  }

  @Delete(':id/force')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Permanently delete an assignment (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204 })
  forceDelete(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.forceDelete(id, user.role);
  }

  @Patch(':id/restore')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Restore a soft deleted assignment (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  restore(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.restore(id, user.role);
  }

  // ================= SUBMISSION ENDPOINTS =================
  @Post('submissions')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiResponse({ status: 201, type: SubmissionResponseDto })
  createSubmission(@Body() dto: CreateSubmissionDto, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.createSubmission(dto, user.sub, user.role);
  }

  @Get(':id/submissions')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Get submissions by assignment ID (Instructors & Admins only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: [SubmissionResponseDto] })
  getSubmissionsByAssignment(@Param('id', ParseIntPipe) assignmentId: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.findSubmissionsByAssignment(assignmentId, user.sub, user.role);
  }

  @Get('submissions/user/:userId')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get submissions by user ID' })
  @ApiParam({ name: 'userId', example: 1 })
  @ApiResponse({ status: 200, type: [SubmissionResponseDto] })
  getSubmissionsByUser(@Param('userId', ParseIntPipe) userId: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.findSubmissionsByUser(userId, user.sub, user.role);
  }

  @Patch('submissions/:id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Update a submission' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  updateSubmission(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSubmissionDto, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.updateSubmission(id, dto, user.sub, user.role);
  }

  @Delete('submissions/:id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 204 })
  removeSubmission(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    const { user } = req;
    return this.assignmentsService.removeSubmission(id, user.sub, user.role);
  }
}
