import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModuleResponseDto {
  @ApiProperty({
    description: 'Module ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Course ID that this module belongs to',
    example: 1,
  })
  courseId: number;

  @ApiProperty({
    description: 'Title of the course module',
    example: 'Introduction to Coffee Brewing',
  })
  title: string;

  @ApiProperty({
    description: 'Order number of the module in the course',
    example: 1,
  })
  orderNumber: number;

  @ApiPropertyOptional({
    description: 'Course information',
    type: 'object',
    properties: {
      id: { type: 'number' },
      title: { type: 'string' },
      slug: { type: 'string' },
    },
    additionalProperties: false,
  })
  course?: {
    id: number;
    title: string;
    slug: string;
  };

  @ApiPropertyOptional({
    description: 'Lessons in this module',
    type: 'array',
  })
  lessons?: Array<{
    id: number;
    title: string;
    slug: string;
    type: string;
    duration: string;
    orderNumber: number;
  }>;
}