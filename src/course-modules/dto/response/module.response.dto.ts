import { ApiProperty } from '@nestjs/swagger';

class CourseInfoDto {
  @ApiProperty({ description: 'Course ID', example: 1 }) id: number;
  @ApiProperty({ description: 'Course title', example: 'Complete Coffee Brewing Course' }) title: string;
  @ApiProperty({ description: 'Instructor ID', example: 2 }) instructorId: number;
}

class LessonDto {
  @ApiProperty({ description: 'Lesson ID', example: 1 }) id: number;
  @ApiProperty({ description: 'Lesson slug', example: 'introduction-to-arabica' }) slug: string;
  @ApiProperty({ description: 'Lesson title', example: 'Introduction to Arabica Coffee' }) title: string;
  @ApiProperty({ description: 'Lesson description', example: 'Learn about Arabica coffee varieties' }) description: string;
  @ApiProperty({ description: 'Lesson duration', example: '15 minutes' }) duration: string;
  @ApiProperty({ description: 'Lesson type', enum: ['VIDEO', 'ARTICLE', 'QUIZ', 'ASSIGNMENT'] }) type: string;
  @ApiProperty({ description: 'Order number', example: 1 }) orderNumber: number;
}

export class ModuleResponseDto {
  @ApiProperty({ description: 'Module ID', example: 1 }) id: number;
  @ApiProperty({ description: 'Course ID', example: 1 }) courseId: number;
  @ApiProperty({ description: 'Module title', example: 'Introduction to Coffee Brewing' }) title: string;
  @ApiProperty({ description: 'Order number', example: 1 }) orderNumber: number;
  @ApiProperty({ description: 'Course information', type: CourseInfoDto }) course: CourseInfoDto;
  @ApiProperty({ description: 'Module lessons', type: [LessonDto] }) lessons: LessonDto[];
  @ApiProperty({ description: 'Creation timestamp', example: '2025-01-15T10:30:00Z' }) createdAt: Date;
}
