import { IsIn, IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsIn(['alat', 'bahan'])
  category: 'alat' | 'bahan';
}
