import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ParseBoolPipe,
} from '@nestjs/common';
import { AssignmentSubmissionService } from './assignment-submissions.service';
import {CreateAssignmentSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateAssignmentSubmissionDto } from './dto/request/update-submission.dto';
import { GradeAssignmentSubmissionDto } from './dto/request/grade-assignment-submission.dto';
import { 
  AssignmentSubmissionListResponseDto,
  AssignmentSubmissionResponseDto,
  AssignmentSubmissionStatsDto
} from './dto/response/submission.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('api')
@UseGuards(JwtGuard, RolesGuard)
export class SubmissionController {
  constructor(private readonly submissionService: AssignmentSubmissionService) {}

  // GET /api/assignments/:id/submissions - Get assignment submissions
  @Get('assignments/:id/submissions')
  @Roles('ADMIN', 'INSTRUCTOR')
  async getAssignmentSubmissions(
    @Param('id', ParseIntPipe) assignmentId: number,
    @Request() req: any,
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 20,
    @Query('graded', ParseBoolPipe) graded?: boolean,
    @Query('userId', ParseIntPipe) userId?: number,
  ): Promise<AssignmentSubmissionListResponseDto> {
    return this.submissionService.getAssignmentSubmissions(
      assignmentId,
      req.user.id,
      req.user.role,
      page,
      limit,
      graded,
      userId,
    );
  }

  // POST /api/assignments/:id/submit - Submit assignment
  @Post('assignments/:id/submit')
  @Roles('USER')
  @HttpCode(HttpStatus.CREATED)
  async submitAssignment(
    @Param('id', ParseIntPipe) assignmentId: number,
    @Body() createSubmissionDto: CreateAssignmentSubmissionDto,
    @Request() req: any,
  ): Promise<AssignmentSubmissionResponseDto> {
    return this.submissionService.submitAssignment(
      assignmentId,
      createSubmissionDto,
      req.user.id,
    );
  }

  // GET /api/submissions/:id - Get submission by ID
  @Get('submissions/:id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  async getSubmissionById(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<AssignmentSubmissionResponseDto> {
    return this.submissionService.getSubmissionById(
      id,
      req.user.id,
      req.user.role,
    );
  }

  // PUT /api/submissions/:id - Update submission
  @Put('submissions/:id')
  @Roles('ADMIN', 'USER')
  async updateSubmission(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubmissionDto: UpdateAssignmentSubmissionDto,
    @Request() req: any,
  ): Promise<AssignmentSubmissionResponseDto> {
    return this.submissionService.updateSubmission(
      id,
      updateSubmissionDto,
      req.user.id,
      req.user.role,
    );
  }

  // DELETE /api/submissions/:id - Delete submission
  @Delete('submissions/:id')
  @Roles('ADMIN', 'USER')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSubmission(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: any,
  ): Promise<void> {
    return this.submissionService.deleteSubmission(
      id,
      req.user.id,
      req.user.role,
    );
  }

  // PUT /api/submissions/:id/grade - Grade submission
  @Put('submissions/:id/grade')
  @Roles('ADMIN', 'INSTRUCTOR')
  async gradeSubmission(
    @Param('id', ParseIntPipe) id: number,
    @Body() gradeSubmissionDto: GradeAssignmentSubmissionDto,
    @Request() req: any,
  ): Promise<AssignmentSubmissionResponseDto> {
    return this.submissionService.gradeSubmission(
      id,
      gradeSubmissionDto,
      req.user.id,
      req.user.role,
    );
  }

  // GET /api/assignments/:id/submissions/stats - Get submission statistics
  @Get('assignments/:id/submissions/stats')
  @Roles('ADMIN', 'INSTRUCTOR')
  async getSubmissionStats(
    @Param('id', ParseIntPipe) assignmentId: number,
    @Request() req: any,
  ): Promise<AssignmentSubmissionStatsDto> {
    return this.submissionService.getSubmissionStats(
      assignmentId,
      req.user.id,
      req.user.role,
    );
  }
}