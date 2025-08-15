import { User, RoleName } from '@prisma/client';

export interface CreateUserData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  role: RoleName;
  isBuyer?: boolean;
  isStudent?: boolean;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  isBuyer?: boolean;
  isStudent?: boolean;
}

export interface IUsersRepository {
  create(data: CreateUserData): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(skip?: number, take?: number): Promise<User[]>;
  update(id: number, data: UpdateUserData): Promise<User>;
  delete(id: number): Promise<User>;
  findByRole(role: RoleName): Promise<User[]>;
}