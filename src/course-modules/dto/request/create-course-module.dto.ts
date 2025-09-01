import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreateCourseModuleDto {
  @ApiProperty({ description: 'Title of the course module' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ description: 'Order number for module sorting', minimum: 1 })
  @IsInt()
  @Min(1)
  orderNumber: number;

  @ApiProperty({ description: 'Associated course ID' })
  @IsInt()
  courseId: number;
}
