import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/request/create-course.dto';
import { UpdateCourseDto } from './dto/request/update-course.dto';

@Injectable()
export class CoursesService {
  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll(page: number, limit: number, p0: unknown) {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
