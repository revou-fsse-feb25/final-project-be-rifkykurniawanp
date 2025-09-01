import { CreateUserDto } from '../dto/request/create-user.dto';
import { UpdateUserDto } from '../dto/request/update-user.dto';
import { RoleName } from '@prisma/client';
export interface UserFilter {
    role?: RoleName;
    deletedAt?: Date | null;
}
export interface IUsersRepository {
    create(data: CreateUserDto & {
        password: string;
    }): Promise<any>;
    findAll(skip: number, take: number, filter?: UserFilter): Promise<any[]>;
    findById(id: number, filter?: UserFilter): Promise<any | null>;
    findByIdIncludingDeleted(id: number): Promise<any | null>;
    findByEmail(email: string, filter?: UserFilter): Promise<any | null>;
    findByEmailIncludingDeleted(email: string): Promise<any | null>;
    findByRole(role: RoleName, filter?: UserFilter): Promise<any[]>;
    countByRole(role: RoleName, filter?: UserFilter): Promise<number>;
    softDelete(id: number): Promise<void>;
    hardDelete(id: number): Promise<void>;
    restore(id: number): Promise<any>;
    findDeleted(skip: number, take: number): Promise<any[]>;
    update(id: number, data: UpdateUserDto): Promise<any>;
}
