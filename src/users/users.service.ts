import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { CreateUserRequestDto } from './dto/request/create-user.dto';
import { UpdateUserRequestDto } from './dto/request/update-user.dto';
import { ChangePasswordRequestDto } from './dto/request/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(dto: CreateUserRequestDto) {
    const exists = await this.usersRepository.findByEmail(dto.email);
    if (exists) throw new BadRequestException('Email already in use');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.create({ ...dto, password: hashedPassword });
  }

  async findAll(page = 1, pageSize = 10) {
    return this.usersRepository.findAll(page, pageSize);
  }

  async findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async update(id: number, dto: UpdateUserRequestDto) {
    if (dto.password) dto.password = await bcrypt.hash(dto.password, 10);
    return this.usersRepository.update(id, dto);
  }

  async delete(id: number) {
    return this.usersRepository.delete(id);
  }

  async changePassword(id: number, dto: ChangePasswordRequestDto) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new BadRequestException('User not found');

    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) throw new BadRequestException('Old password is incorrect');

    const hashedNewPassword = await bcrypt.hash(dto.newPassword, 10);
    return this.usersRepository.update(id, { password: hashedNewPassword });
  }
}
