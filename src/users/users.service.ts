import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { RoleName } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserDto): Promise<UserResponseDto> {
    if (await this.usersRepository.findByEmail(dto.email)) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({ ...dto, password: hashedPassword });
    return this.toResponseDto(user);
  }

  async findAll(page = 1, limit = 10): Promise<UserResponseDto[]> {
    const skip = (page - 1) * limit;
    return (await this.usersRepository.findAll(skip, limit)).map(this.toResponseDto);
  }

  async findOne(id: number, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    // Check access permissions - only ADMIN or own user can access
    if (currentUserRole !== 'ADMIN' || currentUserId !== id) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return this.toResponseDto(user);
  }

  async findByRole(role: RoleName): Promise<UserResponseDto[]> {
    return (await this.usersRepository.findByRole(role)).map(this.toResponseDto);
  }

  async update(id: number, dto: UpdateUserDto, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto> {
    if (!(await this.usersRepository.findById(id))) {
      throw new NotFoundException('User not found');
    }

    // Check access permissions - only ADMIN or own user can update
    if (currentUserRole !== 'ADMIN' && currentUserId !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    // Prevent non-admins from changing role
    if (dto.role && currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only admins can change user roles');
    }

    return this.toResponseDto(await this.usersRepository.update(id, dto));
  }

  async remove(id: number): Promise<void> {
    if (!(await this.usersRepository.findById(id))) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.delete(id);
  }

  private toResponseDto = (user: any): UserResponseDto => {
    const { password, ...rest } = user;
    return rest;
  };
}