import { RoleName as UserRole } from '@prisma/client';
export declare class RegisterDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
}
