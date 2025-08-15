import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssignmentSubmissionsService } from './assignment-submissions.service';
import { SubmitAssignmentDto } from './dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubmissionResponseDto } from './dto/response/submission.response.dto';

@ApiTags('Assignment Submissions')
@Controller('assignment-submissions')
export class AssignmentSubmissionsController {
  constructor(private readonly service: AssignmentSubmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Submit an assignment' })
  @ApiResponse({ status: 201, description: 'Assignment submitted', type: SubmissionResponseDto })
  submit(@Body() dto: SubmitAssignmentDto) {
    return this.service.submit(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, description: 'List of submissions', type: [SubmissionResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get submission by id' })
  @ApiResponse({ status: 200, description: 'Submission details', type: SubmissionResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a submission' })
  @ApiResponse({ status: 200, description: 'Updated submission', type: SubmissionResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateSubmissionDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({ status: 200, description: 'Deleted submission' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
