import { PartialType } from '@nestjs/swagger';
import { CreateProgressDto } from './mark-complete.dto';

export class UpdateProgressDto extends PartialType(CreateProgressDto) {}
