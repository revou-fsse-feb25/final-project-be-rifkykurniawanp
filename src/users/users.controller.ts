import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserRequestDto } from './dto/request/create-user.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.dto';
import { ChangePasswordRequestDto } from './dto/request/change-password.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UserResponseDto } from './dto/response/user-response.dto';
import { PaginatedUserResponseDto } from './dto/response/paginated-user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiResponse({ status: 201, type: UserResponseDto })
  create(@Body() dto: CreateUserRequestDto) {
    return this.usersService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, example: 10 })
  @ApiResponse({ status: 200, type: PaginatedUserResponseDto })
  findAll(@Query('page') page = 1, @Query('pageSize') pageSize = 10) {
    return this.usersService.findAll(Number(page), Number(pageSize));
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findById(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: UserResponseDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserRequestDto) {
    return this.usersService.update(id, dto);
  }

  @Patch(':id/change-password')
  @ApiResponse({ status: 200, description: 'Password changed successfully' })
  changePassword(@Param('id', ParseIntPipe) id: number, @Body() dto: ChangePasswordRequestDto) {
    return this.usersService.changePassword(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
