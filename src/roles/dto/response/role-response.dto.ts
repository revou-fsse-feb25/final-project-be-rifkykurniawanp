// dto/response/role-response.dto.ts
import { RoleName, Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the role',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Role name',
    enum: RoleName,
    example: RoleName.USER
  })
  name: RoleName;

  @ApiPropertyOptional({
    description: 'Description of the role',
    example: 'Standard user with basic access to products and courses'
  })
  description?: string | null;

  @ApiProperty({
    description: 'Role creation timestamp',
    example: '2024-01-15T10:30:00.000Z'
  })
  createdAt: Date;

  constructor(role: Role) {
    this.id = role.id;
    this.name = role.name;
    this.description = role.description;
    this.createdAt = role.createdAt;
  }
}