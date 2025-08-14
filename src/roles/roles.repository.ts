import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Adjust path as needed
import { Role, RoleName, Prisma } from '@prisma/client';
import { IRolesRepository } from './interface/roles.repository.interface';

@Injectable()
export class RolesRepository implements IRolesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(search?: string) {
    // Only search on description field since name is an enum
    const whereCondition: Prisma.RoleWhereInput | undefined = search ? {
      description: { 
        contains: search, 
        mode: "insensitive" 
      }
    } : undefined;

    return this.prisma.role.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' }
    });
  }

  async findById(id: number) {
    return this.prisma.role.findUnique({
      where: { id }
    });
  }

  async findByName(name: RoleName) {
    return this.prisma.role.findUnique({
      where: { name }
    });
  }

  async create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({
      data
    });
  }

  async update(id: number, data: Prisma.RoleUpdateInput) {
    return this.prisma.role.update({
      where: { id },
      data
    });
  }

  async delete(id: number) {
    return this.prisma.role.delete({
      where: { id }
    });
  }

  async count(search?: string): Promise<number> {
    const whereCondition: Prisma.RoleWhereInput | undefined = search ? {
      description: { 
        contains: search, 
        mode: "insensitive" 
      }
    } : undefined;

    return this.prisma.role.count({
      where: whereCondition
    });
  }

  async findPaginated(
    page: number, 
    limit: number, 
    search?: string
  ): Promise<{ data: Role[], total: number, page: number, limit: number }> {
    const whereCondition: Prisma.RoleWhereInput | undefined = search ? {
      description: { 
        contains: search, 
        mode: "insensitive" 
      }
    } : undefined;

    const [data, total] = await Promise.all([
      this.prisma.role.findMany({
        where: whereCondition,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      this.prisma.role.count({
        where: whereCondition
      })
    ]);

    return {
      data,
      total,
      page,
      limit
    };
  }

  // Alternative method: If you want to search by both name and description
  // but handle the enum properly
  async findAllWithEnumSearch(search?: string) {
    if (!search) {
      return this.prisma.role.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }

    // Check if search term matches any enum values
    const matchingRoles = Object.values(RoleName).filter(role =>
      role.toLowerCase().includes(search.toLowerCase())
    );

    const whereCondition: Prisma.RoleWhereInput = {
      OR: [
        ...(matchingRoles.length > 0 ? [{ name: { in: matchingRoles } }] : []),
        { description: { contains: search, mode: "insensitive" } }
      ]
    };

    return this.prisma.role.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' }
    });
  }
}