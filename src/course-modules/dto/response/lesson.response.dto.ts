import { ApiProperty } from '@nestjs/swagger';

export class ModuleLessonResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Introduction' })
  title: string;

  @ApiProperty({ example: 'intro' })
  slug: string;

  @ApiProperty({ example: 'VIDEO' })
  type: string;

  @ApiProperty({ example: '10m' })
  duration: string;

  @ApiProperty({ example: 1 })
  orderNumber: number;
}