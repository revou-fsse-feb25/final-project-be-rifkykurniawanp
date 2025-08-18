import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentResponseDto } from './dto/response/assignment.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('api/assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  // GET /api/assignments - Get all assignments
  @UseGuards(JwtGuard)
  @Get()
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ 
    status: 200, 
    type: [AssignmentResponseDto],
    description: 'List of assignments'
  })
  async getAllAssignments() {
    return this.assignmentsService.findAll();
  }

  // GET /api/assignments/{id} - Get assignment by ID
  @UseGuards(JwtGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get assignment by ID' })
  @ApiResponse({ 
    status: 200, 
    type: AssignmentResponseDto,
    description: 'Assignment details'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Assignment not found'
  })
  async getAssignment(@Param('id') id: string) {
    return this.assignmentsService.findOne(+id);
  }

  // POST /api/assignments - Create new assignment
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Post()
  @ApiOperation({ summary: 'Create new assignment' })
  @ApiResponse({ 
    status: 201, 
    type: AssignmentResponseDto,
    description: 'Assignment created successfully'
  })
  async createAssignment(
    @Body() dto: CreateAssignmentDto,
    @Request() req: any
  ) {
    return this.assignmentsService.create(dto, req.user);
  }

  // PUT /api/assignments/{id} - Update assignment
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Put(':id')
  @ApiOperation({ summary: 'Update assignment' })
  @ApiResponse({ 
    status: 200, 
    type: AssignmentResponseDto,
    description: 'Assignment updated successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Assignment not found'
  })
  async updateAssignment(
    @Param('id') id: string,
    @Body() dto: UpdateAssignmentDto,
    @Request() req: any
  ) {
    return this.assignmentsService.update(+id, dto, req.user);
  }

  // DELETE /api/assignments/{id} - Delete assignment
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'INSTRUCTOR')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete assignment' })
  @ApiResponse({ 
    status: 200, 
    description: 'Assignment deleted successfully'
  })
  @ApiResponse({ 
    status: 404, 
    description: 'Assignment not found'
  })
  async deleteAssignment(@Param('id') id: string, @Request() req: any) {
    return this.assignmentsService.remove(+id, req.user);
  }
}
