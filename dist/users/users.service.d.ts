import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { RoleName } from '@prisma/client';
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: UsersRepository);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(page?: number, limit?: number): Promise<UserResponseDto[]>;
    findOne(id: number, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto>;
    findByRole(role: RoleName): Promise<UserResponseDto[]>;
    update(id: number, dto: UpdateUserDto, currentUserId?: number, currentUserRole?: RoleName): Promise<UserResponseDto>;
    remove(id: number, currentUserId?: number, currentUserRole?: RoleName): Promise<void>;
    forceDelete(id: number, currentUserRole: RoleName): Promise<void>;
    restore(id: number, currentUserRole: RoleName): Promise<UserResponseDto>;
    getDeleted(page: number | undefined, limit: number | undefined, currentUserRole: RoleName): Promise<UserResponseDto[]>;
    private toResponseDto;
}
