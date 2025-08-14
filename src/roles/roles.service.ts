// roles.service.ts
import { 
  Injectable, 
  NotFoundException, 
  ConflictException,
  BadRequestException 
} from '@nestjs/common';
import { RoleName } from '@prisma/client';
import { RolesRepository } from './roles.repository';
import { CreateRoleDto } from './dto/request/create-role.dto';
import { UpdateRoleDto } from './dto/request/update-role.dto';
import { RoleResponseDto } from './dto/response/role-response.dto';
import { PaginatedRoleResponseDto } from './dto/response/paginated-role-response.dto';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findAll(search?: string): Promise<RoleResponseDto[]> {
    const roles = await this.rolesRepository.findAll(search);
    return roles.map(role => new RoleResponseDto(role));
  }

  async findPaginated(
    page: number = 1,
    limit: number = 10,
    search?: string
  ): Promise<PaginatedRoleResponseDto> {
    // Validate pagination parameters
    if (page < 1) {
      throw new BadRequestException('Page number must be greater than 0');
    }
    if (limit < 1 || limit > 100) {
      throw new BadRequestException('Limit must be between 1 and 100');
    }

    const result = await this.rolesRepository.findPaginated(page, limit, search);
    const roleResponseDtos = result.data.map(role => new RoleResponseDto(role));
    
    return new PaginatedRoleResponseDto(
      roleResponseDtos,
      result.total,
      result.page,
      result.limit
    );
  }

  async findById(id: number): Promise<RoleResponseDto> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid role ID');
    }

    const role = await this.rolesRepository.findById(id);
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return new RoleResponseDto(role);
  }

  async findByName(name: RoleName): Promise<RoleResponseDto> {
    const role = await this.rolesRepository.findByName(name);
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }

    return new RoleResponseDto(role);
  }

  async create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    // Check if role with this name already exists
    const existingRole = await this.rolesRepository.findByName(createRoleDto.name);
    if (existingRole) {
      throw new ConflictException(`Role with name ${createRoleDto.name} already exists`);
    }

    try {
      const role = await this.rolesRepository.create(createRoleDto);
      return new RoleResponseDto(role);
    } catch (error) {
      throw new ConflictException('Failed to create role. Role might already exist.');
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleResponseDto> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid role ID');
    }

    // Check if role exists
    const existingRole = await this.rolesRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    // Check if new name conflicts with existing role (if name is being updated)
    if (updateRoleDto.name && updateRoleDto.name !== existingRole.name) {
      const roleWithNewName = await this.rolesRepository.findByName(updateRoleDto.name);
      if (roleWithNewName) {
        throw new ConflictException(`Role with name ${updateRoleDto.name} already exists`);
      }
    }

    try {
      const updatedRole = await this.rolesRepository.update(id, updateRoleDto);
      return new RoleResponseDto(updatedRole);
    } catch (error) {
      throw new ConflictException('Failed to update role');
    }
  }

  async delete(id: number): Promise<{ message: string; deletedRole: RoleResponseDto }> {
    if (!id || id <= 0) {
      throw new BadRequestException('Invalid role ID');
    }

    // Check if role exists
    const existingRole = await this.rolesRepository.findById(id);
    if (!existingRole) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    try {
      const deletedRole = await this.rolesRepository.delete(id);
      return {
        message: `Role ${deletedRole.name} has been successfully deleted`,
        deletedRole: new RoleResponseDto(deletedRole)
      };
    } catch (error) {
      throw new ConflictException(
        'Failed to delete role. The role might be associated with existing users.'
      );
    }
  }

  async getAvailableRoleNames(): Promise<{ roles: RoleName[]; count: number }> {
    const roles = Object.values(RoleName);
    return {
      roles,
      count: roles.length
    };
  }
}