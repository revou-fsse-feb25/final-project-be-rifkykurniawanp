import { ApiProperty } from '@nestjs/swagger';

export class InstructorResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'instructor@example.com' })
  email: string;
}