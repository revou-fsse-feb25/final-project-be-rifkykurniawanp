import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-course.dto';

export class UserUpdateDto extends PartialType(CreateUserDto) {}
