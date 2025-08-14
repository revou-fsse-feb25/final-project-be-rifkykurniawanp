import { User, RoleName } from '@prisma/client';

export interface IUsersRepository {
  create(data: { name: string; email: string; password: string; role: RoleName }): Promise<User>;
  findAll(page: number, pageSize: number): Promise<{ data: User[]; total: number }>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  update(id: number, data: Partial<User>): Promise<User>;
  delete(id: number): Promise<User>;
}
