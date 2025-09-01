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
    // Check for existing email (including soft deleted users)
    const existingUser = await this.usersRepository.findByEmailIncludingDeleted(dto.email);
    if (existingUser && !existingUser.deletedAt) {
      throw new BadRequestException('Email already exists');
    }
    
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = await this.usersRepository.create({
  ...dto,
  name: `${dto.firstName ?? ''} ${dto.lastName ?? ''}`.trim(),
  password: hashedPassword,
});
    return this.toResponseDto(user);
  }

  async findAll(page = 1, limit = 10): Promise<UserResponseDto[]> {
    const skip = (page - 1) * limit;
    // Add deletedAt: null filter to exclude soft deleted users
    const users = await this.usersRepository.findAll(skip, limit, { deletedAt: null });
    return users.map(this.toResponseDto);
  }

  async findOne(id: number, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id, { deletedAt: null });
    if (!user) throw new NotFoundException('User not found');

    // Check access permissions - only ADMIN or own user can access
    if (currentUserRole !== 'ADMIN' && currentUserId !== id) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return this.toResponseDto(user);
  }

  async findByRole(role: RoleName): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.findByRole(role, { deletedAt: null });
    return users.map(this.toResponseDto);
  }

  async update(id: number, dto: UpdateUserDto, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto> {
    const user = await this.usersRepository.findById(id, { deletedAt: null });
    if (!user) {
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

    // If updating email, check for conflicts
    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.usersRepository.findByEmail(dto.email, { deletedAt: null });
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    const updatedUser = await this.usersRepository.update(id, dto);
    return this.toResponseDto(updatedUser);
  }

  // Soft delete implementation
  async remove(id: number, currentUserId?: number, currentUserRole?: RoleName): Promise<void> {
    const user = await this.usersRepository.findById(id, { deletedAt: null });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check permissions - only ADMIN or own user can delete
    if (currentUserRole !== 'ADMIN' && currentUserId !== id) {
      throw new ForbiddenException('You can only delete your own account');
    }

    // Prevent self-deletion for the last admin
    if (user.role === 'ADMIN') {
      const adminCount = await this.usersRepository.countByRole('ADMIN', { deletedAt: null });
      if (adminCount <= 1) {
        throw new BadRequestException('Cannot delete the last admin user');
      }
    }

    // Perform soft delete by setting deletedAt timestamp
    await this.usersRepository.softDelete(id);
  }

  // Hard delete for admin purposes (optional)
  async forceDelete(id: number, currentUserRole: RoleName): Promise<void> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can permanently delete users');
    }

    const user = await this.usersRepository.findByIdIncludingDeleted(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersRepository.hardDelete(id);
  }

  // Restore soft deleted user
  async restore(id: number, currentUserRole: RoleName): Promise<UserResponseDto> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can restore users');
    }

    const user = await this.usersRepository.findByIdIncludingDeleted(id);
    if (!user || !user.deletedAt) {
      throw new NotFoundException('Deleted user not found');
    }

    // Check if email is still available
    const emailExists = await this.usersRepository.findByEmail(user.email, { deletedAt: null });
    if (emailExists) {
      throw new BadRequestException('Cannot restore user: email is already in use');
    }

    const restoredUser = await this.usersRepository.restore(id);
    return this.toResponseDto(restoredUser);
  }

  // Get soft deleted users (admin only)
  async getDeleted(page = 1, limit = 10, currentUserRole: RoleName): Promise<UserResponseDto[]> {
    if (currentUserRole !== 'ADMIN') {
      throw new ForbiddenException('Only ADMIN can view deleted users');
    }

    const skip = (page - 1) * limit;
    const users = await this.usersRepository.findDeleted(skip, limit);
    return users.map(this.toResponseDto);
  }

  private toResponseDto = (user: any): UserResponseDto => {
    const { password, ...rest } = user;
    return rest;
  };
}