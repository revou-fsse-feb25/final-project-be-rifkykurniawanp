import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/request/register.dto';
import { LoginDto } from './dto/request/login.dto';
import { AuthResponseDto } from './dto/response/auth-response.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<AuthResponseDto>;
    login(dto: LoginDto): Promise<AuthResponseDto>;
    private generateToken;
    getUserProfile(userId: number): Promise<{
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        isBuyer: boolean;
        isStudent: boolean;
        id: number;
        avatar: string | null;
        dynamicRoleId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    updateProfile(userId: number, updateData: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        address?: string;
    }): Promise<{
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        isBuyer: boolean;
        isStudent: boolean;
        id: number;
        avatar: string | null;
        dynamicRoleId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyToken(token: string): Promise<{
        email: string;
        password: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        isBuyer: boolean;
        isStudent: boolean;
        id: number;
        avatar: string | null;
        dynamicRoleId: number | null;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }>;
}
