import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateModuleDto {
  @ApiProperty({
    description: 'Course ID that this module belongs to',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({
    description: 'Title of the course module',
    example: 'Introduction to Coffee Brewing',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Order number of the module in the course',
    example: 1,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  orderNumber: number;
}