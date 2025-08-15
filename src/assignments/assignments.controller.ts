import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly service: AssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, type: AssignmentResponseDto })
  create(@Body() dto: CreateAssignmentDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, type: [AssignmentResponseDto] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by id' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  findOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiResponse({ status: 200, type: AssignmentResponseDto })
  update(@Param('id') id: number, @Body() dto: UpdateAssignmentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignment' })
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
