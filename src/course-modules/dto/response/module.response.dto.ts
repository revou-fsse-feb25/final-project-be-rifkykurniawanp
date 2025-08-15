import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CourseResponseDto } from './course.response.dto';
import { ModuleLessonResponseDto } from './lesson.response.dto';

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

  @ApiPropertyOptional({ type: () => CourseResponseDto })
  course?: CourseResponseDto;

  @ApiPropertyOptional({ type: () => [ModuleLessonResponseDto] })
  lessons?: ModuleLessonResponseDto[];
}