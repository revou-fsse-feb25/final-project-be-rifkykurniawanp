import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@ApiTags('Assignments')
@Controller('api/assignments')
@UseGuards(JwtGuard, RolesGuard)
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Get()
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, description: 'Assignments retrieved successfully' })
  async findAll() {
    return this.assignmentsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'INSTRUCTOR', 'USER')
  @ApiOperation({ summary: 'Get assignment by ID' })
  @ApiResponse({ status: 200, description: 'Assignment retrieved successfully' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.assignmentsService.findOne(id);
  }

  @Post()
  @Roles('ADMIN', 'INSTRUCTOR')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, description: 'Assignment created successfully' })
  async create(@Body() dto: CreateAssignmentDto, @Request() req: any) {
    return this.assignmentsService.create(dto, req.user);
  }

  @Put(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiResponse({ status: 200, description: 'Assignment updated successfully' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAssignmentDto,
    @Request() req: any,
  ) {
    return this.assignmentsService.update(id, dto, req.user);
  }

  @Delete(':id')
  @Roles('ADMIN', 'INSTRUCTOR')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiResponse({ status: 204, description: 'Assignment deleted successfully' })
  async remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.assignmentsService.remove(id, req.user);
  }
}
