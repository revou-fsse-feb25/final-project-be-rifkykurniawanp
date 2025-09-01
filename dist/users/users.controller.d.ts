import { Request } from 'express';
import { RoleName } from '@prisma/client';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
interface AuthenticatedRequest extends Request {
    user: {
        id: number;
        role: string;
        email: string;
    };
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(page?: string, limit?: string): Promise<UserResponseDto[]>;
    findByRole(role: RoleName): Promise<UserResponseDto[]>;
    findOne(id: number, req: AuthenticatedRequest): Promise<UserResponseDto>;
    update(id: number, dto: UpdateUserDto, req: AuthenticatedRequest): Promise<UserResponseDto>;
    remove(id: number, req: AuthenticatedRequest): Promise<void>;
    getDeleted(req: AuthenticatedRequest, page?: string, limit?: string): Promise<UserResponseDto[]>;
    forceDelete(id: number, req: AuthenticatedRequest): Promise<void>;
    restore(id: number, req: AuthenticatedRequest): Promise<UserResponseDto>;
}
export {};
