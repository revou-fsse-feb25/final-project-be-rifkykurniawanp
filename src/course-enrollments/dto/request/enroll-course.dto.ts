import { IsInt, IsDecimal, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EnrollCourseDto {
  @ApiProperty({ example: 1 })
  courseId: number;

  @ApiProperty({ example: 2 })
  studentId: number;

  @ApiProperty({ example: 200000.00 })
  pricePaid: number;

  @ApiProperty({ example: 0 })
  progress: number;

  @ApiProperty({ example: false })
  certificateAwarded: boolean;
}
