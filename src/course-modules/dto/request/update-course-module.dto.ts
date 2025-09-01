import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class UpdateCourseModuleDto {
  @ApiPropertyOptional({ description: 'Title of the course module' })
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiPropertyOptional({ description: 'Order number for module sorting', minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  orderNumber?: number;
}
