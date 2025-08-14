// interface/roles.repository.interface.ts
import { Role, RoleName, Prisma } from '@prisma/client';

export interface IRolesRepository {
  findAll(search?: string): Promise<Role[]>;
  findById(id: number): Promise<Role | null>;
  findByName(name: RoleName): Promise<Role | null>;
  create(data: Prisma.RoleCreateInput): Promise<Role>;
  update(id: number, data: Prisma.RoleUpdateInput): Promise<Role>;
  delete(id: number): Promise<Role>;
  count(search?: string): Promise<number>;
  findPaginated(
    page: number, 
    limit: number, 
    search?: string
  ): Promise<{ data: Role[], total: number, page: number, limit: number }>;
}