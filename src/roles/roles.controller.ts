// roles.controller.ts
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiConflictResponse
} from '@nestjs/swagger';
import { RoleName } from '@prisma/client';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/request/create-role.dto';
import { UpdateRoleDto } from './dto/request/update-role.dto';
import { RoleResponseDto } from './dto/response/role-response.dto';
import { PaginatedRoleResponseDto } from './dto/response/paginated-role-response.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all roles with optional search' })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Search roles by description',
    example: 'administrator'
  })
  @ApiResponse({
    status: 200,
    description: 'List of roles retrieved successfully',
    type: [RoleResponseDto]
  })
  async findAll(@Query('search') search?: string): Promise<RoleResponseDto[]> {
    return this.rolesService.findAll(search);
  }

  @Get('paginated')
  @ApiOperation({ summary: 'Get paginated roles with optional search' })
  @ApiQuery({ 
    name: 'page', 
    required: false, 
    description: 'Page number (default: 1)',
    example: 1
  })
  @ApiQuery({ 
    name: 'limit', 
    required: false, 
    description: 'Items per page (default: 10, max: 100)',
    example: 10
  })
  @ApiQuery({ 
    name: 'search', 
    required: false, 
    description: 'Search roles by description',
    example: 'administrator'
  })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of roles retrieved successfully',
    type: PaginatedRoleResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid pagination parameters' })
  async findPaginated(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search?: string
  ): Promise<PaginatedRoleResponseDto> {
    return this.rolesService.findPaginated(page, limit, search);
  }

  @Get('available-names')
  @ApiOperation({ summary: 'Get all available role names from enum' })
  @ApiResponse({
    status: 200,
    description: 'Available role names retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        roles: {
          type: 'array',
          items: { enum: Object.values(RoleName) }
        },
        count: { type: 'number' }
      }
    }
  })
  async getAvailableRoleNames(): Promise<{ roles: RoleName[]; count: number }> {
    return this.rolesService.getAvailableRoleNames();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get role by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Role ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Role retrieved successfully',
    type: RoleResponseDto
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid role ID' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<RoleResponseDto> {
    return this.rolesService.findById(id);
  }

  @Get('by-name/:name')
  @ApiOperation({ summary: 'Get role by name' })
  @ApiParam({ 
    name: 'name', 
    description: 'Role name',
    enum: RoleName,
    example: RoleName.USER
  })
  @ApiResponse({
    status: 200,
    description: 'Role retrieved successfully',
    type: RoleResponseDto
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  async findByName(@Param('name') name: RoleName): Promise<RoleResponseDto> {
    return this.rolesService.findByName(name);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiResponse({
    status: 201,
    description: 'Role created successfully',
    type: RoleResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  @ApiConflictResponse({ description: 'Role already exists' })
  async create(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) 
    createRoleDto: CreateRoleDto
  ): Promise<RoleResponseDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update role by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Role ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Role updated successfully',
    type: RoleResponseDto
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid input data or role ID' })
  @ApiConflictResponse({ description: 'Role name already exists' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) 
    updateRoleDto: UpdateRoleDto
  ): Promise<RoleResponseDto> {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete role by ID' })
  @ApiParam({ 
    name: 'id', 
    description: 'Role ID',
    example: 1
  })
  @ApiResponse({
    status: 200,
    description: 'Role deleted successfully',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        deletedRole: { $ref: '#/components/schemas/RoleResponseDto' }
      }
    }
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiBadRequestResponse({ description: 'Invalid role ID' })
  @ApiConflictResponse({ description: 'Cannot delete role with existing associations' })
  async delete(
    @Param('id', ParseIntPipe) id: number
  ): Promise<{ message: string; deletedRole: RoleResponseDto }> {
    return this.rolesService.delete(id);
  }
}