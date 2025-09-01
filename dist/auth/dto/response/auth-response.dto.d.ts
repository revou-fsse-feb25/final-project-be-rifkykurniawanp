import { RoleName } from '@prisma/client';
export declare class UserPayloadDto {
    id: number;
    email: string;
    role: RoleName;
}
export declare class AuthResponseDto {
    accessToken: string;
    user: UserPayloadDto;
}
