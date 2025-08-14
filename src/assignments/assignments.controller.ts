import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { GradeAssignmentDto } from './dto/request/grade-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { AssignmentResponseDto } from './dto/response/assignment-response.dto';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create new assignment' })
  @ApiBody({ type: CreateAssignmentDto })
  @ApiResponse({ status: 201, type: AssignmentResponseDto })
  create(@Body() dto: CreateAssignmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assignments (paginated)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({
    status: 200,
    schema: {
      properties: {
        data: { type: 'array', items: { $ref: getRef(AssignmentResponseDto) } },
        total: { type: 'number', example: 0 },
        page: { type: 'number', example: 1 },
        limit: { type: 'number', example: 10 },
      },
    },
  })
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.service.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by ID' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  @ApiResponse({ status: 404, description: 'Assignment not found' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update assignment' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: UpdateAssignmentDto })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  update(@Param('id') id: string, @Body() dto: UpdateAssignmentDto) {
    return this.service.update(Number(id), dto);
  }

  @Post(':id/grade')
  @ApiOperation({ summary: 'Grade assignment (aggregate demo)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiBody({ type: GradeAssignmentDto })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  grade(@Param('id') id: string, @Body() dto: GradeAssignmentDto) {
    return this.service.grade(Number(id), dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete assignment' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiResponse({ status: 200, description: 'Assignment deleted' })
  remove(@Param('id') id: string) {
    return this.service.remove(Number(id));
  }
}

// helper to reference DTO in inline schema
function getRef(cls: any) {
  return `#/components/schemas/${cls.name}`;
}
