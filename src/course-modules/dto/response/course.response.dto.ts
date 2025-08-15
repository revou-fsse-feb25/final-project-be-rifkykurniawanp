import { ApiProperty } from '@nestjs/swagger';

export class CourseResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Introduction to Coffee Brewing' })
  title: string;

  @ApiProperty({ example: 'intro-to-coffee-brewing' })
  slug: string;
}