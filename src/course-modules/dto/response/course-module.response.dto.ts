import { ApiProperty } from '@nestjs/swagger';
import { LessonResponseDto } from '../../../lessons/dto/response/lesson.response.dto';

export class CourseModuleResponseDto {
  @ApiProperty({ description: 'ID of the course module' })
  id: number;

  @ApiProperty({ description: 'Title of the module' })
  title: string;

  @ApiProperty({ description: 'Order number of the module' })
  orderNumber: number;

  @ApiProperty({ description: 'Associated course ID' })
  courseId: number;

  @ApiProperty({ description: 'List of lessons in the module', type: [LessonResponseDto] })
  lessons: LessonResponseDto[];

  @ApiProperty({ description: 'Created at timestamp' })
  createdAt: Date;
}
