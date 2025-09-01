import { RoleName } from '@prisma/client';
export declare class UserResponseDto {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    address?: string;
    role: RoleName;
    isBuyer: boolean;
    isStudent: boolean;
    createdAt: Date;
}
