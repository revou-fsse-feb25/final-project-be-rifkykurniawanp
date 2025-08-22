import { PrismaService } from '../prisma/prisma.service';
import { User, RoleName } from '@prisma/client';
export interface CreateUserData {
    email: string;
    password: string;
    name: string;
    role?: RoleName;
}
export interface UpdateUserData {
    email?: string;
    password?: string;
    name?: string;
    role?: RoleName;
}
export declare class UsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserData): Promise<User>;
    findById(id: number, filters?: Partial<{
        deletedAt: null;
    }>): Promise<User | null>;
    findByIdIncludingDeleted(id: number): Promise<User | null>;
    findByEmail(email: string, filters?: Partial<{
        deletedAt: null;
    }>): Promise<User | null>;
    findByEmailIncludingDeleted(email: string): Promise<User | null>;
    findAll(skip?: number, take?: number, filters?: Partial<{
        deletedAt: null;
    }>): Promise<User[]>;
    findByRole(role: RoleName, filters?: Partial<{
        deletedAt: null;
    }>): Promise<User[]>;
    countByRole(role: RoleName, filters?: Partial<{
        deletedAt: null;
    }>): Promise<number>;
    update(id: number, data: UpdateUserData): Promise<User>;
    softDelete(id: number): Promise<User>;
    hardDelete(id: number): Promise<User>;
    restore(id: number): Promise<User>;
    findDeleted(skip?: number, take?: number): Promise<User[]>;
}
