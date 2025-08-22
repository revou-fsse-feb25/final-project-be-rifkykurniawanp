import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Request } from 'express';
import { RoleName } from '@prisma/client';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { JwtGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorator/roles.decorator';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    role: string;
    email: string;
  };
}

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ description: 'The user has been successfully created.', type: UserResponseDto })
  @ApiBadRequestResponse({ description: 'Email already exists' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users with pagination' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ description: 'A list of users', type: [UserResponseDto] })
  findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ): Promise<UserResponseDto[]> {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return this.usersService.findAll(pageNum, limitNum);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('role/:role')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get users by role' })
  @ApiParam({ name: 'role', enum: RoleName })
  @ApiOkResponse({ description: 'Users with the specified role', type: [UserResponseDto] })
  findByRole(@Param('role') role: RoleName): Promise<UserResponseDto[]> {
    return this.usersService.findByRole(role);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER')
  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ description: 'The user with the given ID', type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    return this.usersService.findOne(id, req.user.id, req.user.role as any);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER')
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ description: 'The updated user', type: UserResponseDto })
  @ApiBody({ type: UpdateUserDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Invalid input or email already exists' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    return this.usersService.update(id, dto, req.user.id, req.user.role as any);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER')
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a user' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ description: 'User successfully deleted (soft delete)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.usersService.remove(id, req.user.id, req.user.role as any);
  }

  // NEW SOFT DELETE ENDPOINTS
  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('deleted')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all soft deleted users (Admin only)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiOkResponse({ description: 'A list of deleted users', type: [UserResponseDto] })
 getDeleted(
  @Req() req: AuthenticatedRequest,
  @Query('page') page?: string,
  @Query('limit') limit?: string,
): Promise<UserResponseDto[]> {

    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 10;
    return this.usersService.getDeleted(pageNum, limitNum, req.user.role as any);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Delete(':id/force')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Permanently delete a user by ID (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ description: 'User permanently deleted' })
  @ApiNotFoundResponse({ description: 'User not found' })
  forceDelete(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<void> {
    return this.usersService.forceDelete(id, req.user.role as any);
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles('ADMIN')
  @Patch(':id/restore')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Restore a soft deleted user (Admin only)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiOkResponse({ description: 'User successfully restored', type: UserResponseDto })
  @ApiNotFoundResponse({ description: 'Deleted user not found' })
  restore(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: AuthenticatedRequest,
  ): Promise<UserResponseDto> {
    return this.usersService.restore(id, req.user.role as any);
  }
}