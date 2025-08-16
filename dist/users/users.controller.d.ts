import { UsersService } from './users.service';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { RoleName } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(dto: CreateUserDto): Promise<UserResponseDto>;
    findAll(page?: number, limit?: number): Promise<UserResponseDto[]>;
    findByRole(role: RoleName): Promise<UserResponseDto[]>;
    findOne(id: number): Promise<UserResponseDto>;
    update(id: number, dto: UpdateUserDto): Promise<UserResponseDto>;
    remove(id: number): Promise<void>;
}
