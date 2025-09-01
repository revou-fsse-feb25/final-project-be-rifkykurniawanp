import { ApiProperty } from '@nestjs/swagger';

export class SupplierResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John', required: false })
  firstName?: string;

  @ApiProperty({ example: 'Doe', required: false })
  lastName?: string;

  @ApiProperty({ example: 'supplier@example.com' })
  email: string;
}