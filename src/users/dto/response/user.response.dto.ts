import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'John', required: false })
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  lastName?: string;

  @ApiProperty({ example: '+6281234567890', required: false })
  phone?: string;

  @ApiProperty({ example: 'Jl. Sudirman No.1', required: false })
  address?: string;

  @ApiProperty({ enum: RoleName, example: RoleName.USER })
  role: RoleName;

  @ApiProperty({ example: true })
  isBuyer: boolean;

  @ApiProperty({ example: false })
  isStudent: boolean;

  @ApiProperty({ example: '2025-08-15T10:00:00Z' })
  createdAt: Date;
}
