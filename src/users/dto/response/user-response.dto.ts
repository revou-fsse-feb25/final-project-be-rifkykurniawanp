import { ApiProperty } from '@nestjs/swagger';
import { RoleName } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ enum: RoleName, example: RoleName.USER })
  role: RoleName;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2025-08-14T12:00:00.000Z' })
  updatedAt: Date;
}
