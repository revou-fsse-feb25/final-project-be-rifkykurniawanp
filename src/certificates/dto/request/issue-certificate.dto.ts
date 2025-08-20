import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IssueCertificateDto {
  @ApiProperty({
    example: 101,
    description: 'Unique ID of the associated enrollment',
  })
  @IsInt()
  @IsNotEmpty()
  enrollmentId: number;
}
