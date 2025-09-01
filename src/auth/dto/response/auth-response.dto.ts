import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';

export class UserPayloadDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'USER', enum: RoleName })
  role: RoleName;
}

export class AuthResponseDto {
  @ApiProperty({ example: 'jwt.token.here' })
  accessToken: string;

  @ApiProperty({ type: UserPayloadDto })
  user: UserPayloadDto;
}
