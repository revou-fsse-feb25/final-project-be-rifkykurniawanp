import { RoleName } from '@prisma/client';
export declare class RegisterDto {
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
