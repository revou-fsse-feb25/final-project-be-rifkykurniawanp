import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/request/create-submission.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody } from '@nestjs/swagger';
import { SubmissionResponseDto } from './dto/response/submission-response.dto';

@ApiTags('Submissions')
@Controller('assignments/:assignmentId/submissions')
export class SubmissionsController {
  constructor(private readonly service: SubmissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new submission for an assignment' })
  @ApiParam({ name: 'assignmentId', type: Number, example: 1 })
  @ApiBody({ type: CreateSubmissionDto })
  @ApiResponse({ status: 201, type: SubmissionResponseDto })
  create(@Param('assignmentId') assignmentId: string, @Body() dto: CreateSubmissionDto) {
    return this.service.create(assignmentId, dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions of an assignment (paginated)' })
  @ApiParam({ name: 'assignmentId', type: Number, example: 1 })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        data: { type: 'array', items: { $ref: getRef(SubmissionResponseDto) } },
        total: { type: 'number', example: 0 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
      },
    },
  })
  findAll(@Param('assignmentId') assignmentId: string, @Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(assignmentId, Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one submission by ID' })
  @ApiParam({ name: 'assignmentId', type: Number, example: 1 })
  @ApiParam({ name: 'id', type: Number, example: 1001 })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  findOne(@Param('assignmentId') assignmentId: string, @Param('id') id: string) {
    return this.service.findOne(assignmentId, id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a submission' })
  @ApiParam({ name: 'assignmentId', type: Number, example: 1 })
  @ApiParam({ name: 'id', type: Number, example: 1001 })
  @ApiBody({ type: UpdateSubmissionDto })
  @ApiResponse({ status: 200, type: SubmissionResponseDto })
  update(@Param('assignmentId') assignmentId: string, @Param('id') id: string, @Body() dto: UpdateSubmissionDto) {
    return this.service.update(assignmentId, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiParam({ name: 'assignmentId', type: Number, example: 1 })
  @ApiParam({ name: 'id', type: Number, example: 1001 })
  @ApiResponse({ status: 200, description: 'Submission deleted' })
  remove(@Param('assignmentId') assignmentId: string, @Param('id') id: string) {
    return this.service.remove(assignmentId, id);
  }
}

function getRef(cls: any) {
  return `#/components/schemas/${cls.name}`;
}
