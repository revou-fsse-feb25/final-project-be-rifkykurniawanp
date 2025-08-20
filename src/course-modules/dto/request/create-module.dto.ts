import { IsString, IsNotEmpty, IsInt, Min, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleDto {
  @ApiProperty({ description: 'Module title', example: 'Introduction to Coffee Brewing', maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({ description: 'Order number of the module within the course', example: 1, minimum: 1 })
  @IsInt()
  @Min(1)
  orderNumber: number;
}
