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
        id: number;
        createdAt: Date;
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.RoleName;
        isBuyer: boolean;
        isStudent: boolean;
    }>;
    updateProfile(userId: number, updateData: {
        firstName?: string;
        lastName?: string;
        phone?: string;
        address?: string;
    }): Promise<{
        id: number;
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.RoleName;
        isBuyer: boolean;
        isStudent: boolean;
    }>;
    changePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    verifyToken(token: string): Promise<{
        id: number;
        createdAt: Date;
        email: string;
        firstName: string | null;
        lastName: string | null;
        phone: string | null;
        address: string | null;
        role: import(".prisma/client").$Enums.RoleName;
        isBuyer: boolean;
        isStudent: boolean;
    }>;
}
