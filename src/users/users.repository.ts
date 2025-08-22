// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User, RoleName } from '@prisma/client';

export interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role?: RoleName; // optional di DTO, tapi akan diberi default saat create
}

export interface UpdateUserData {
  email?: string;
  password?: string;
  name?: string;
  role?: RoleName;
}

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE
  async create(data: CreateUserData): Promise<User> {
    return this.prisma.user.create({
      data: {
        ...data,
        role: data.role ?? 'USER', // default role jika undefined
      },
    });
  }

  // FIND BY ID (only non-deleted)
  async findById(id: number, filters: Partial<{ deletedAt: null }> = { deletedAt: null }): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { id, ...filters },
    });
  }

  // FIND BY ID INCLUDING deleted
  async findByIdIncludingDeleted(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // FIND BY EMAIL (only non-deleted)
  async findByEmail(email: string, filters: Partial<{ deletedAt: null }> = { deletedAt: null }): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email, ...filters },
    });
  }

  // FIND BY EMAIL INCLUDING deleted
  async findByEmailIncludingDeleted(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: { email },
    });
  }

  // FIND ALL (non-deleted)
  async findAll(skip = 0, take = 10, filters: Partial<{ deletedAt: null }> = { deletedAt: null }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { ...filters },
      skip,
      take,
      orderBy: { id: 'asc' },
    });
  }

  // FIND BY ROLE (non-deleted)
  async findByRole(role: RoleName, filters: Partial<{ deletedAt: null }> = { deletedAt: null }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { role, ...filters },
    });
  }

  // COUNT BY ROLE (non-deleted)
  async countByRole(role: RoleName, filters: Partial<{ deletedAt: null }> = { deletedAt: null }): Promise<number> {
    return this.prisma.user.count({
      where: { role, ...filters },
    });
  }

  // UPDATE
  async update(id: number, data: UpdateUserData): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // SOFT DELETE
  async softDelete(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  // HARD DELETE
  async hardDelete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // RESTORE
  async restore(id: number): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { deletedAt: null },
    });
  }

  // FIND DELETED
  async findDeleted(skip = 0, take = 10): Promise<User[]> {
    return this.prisma.user.findMany({
      where: { NOT: { deletedAt: null } },
      skip,
      take,
    });
  }
}
