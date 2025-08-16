import { PrismaService } from '../prisma/prisma.service';
import { User, RoleName } from '@prisma/client';
import { IUsersRepository, CreateUserData, UpdateUserData } from './interfaces/users.repository.interface';
export declare class UsersRepository implements IUsersRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateUserData): Promise<User>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(skip?: number, take?: number): Promise<User[]>;
    update(id: number, data: UpdateUserData): Promise<User>;
    delete(id: number): Promise<User>;
    findByRole(role: RoleName): Promise<User[]>;
}
