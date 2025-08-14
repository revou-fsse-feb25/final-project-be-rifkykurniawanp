import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { courses } from './courses.repository';

@Controller('courses')
export class CoursesController {
  @Get()
  getAllCourses(@Query('category') category?: string): Course[] {
    if (category) {
      const filtered = courses.filter(
        (course) => course.category.toLowerCase() === category.toLowerCase(),
      );
      return filtered;
    }
    return courses;
  }

  @Get(':id')
  getCourseById(@Param('id') id: string): Course {
    const course = courses.find((c) => c.id === parseInt(id));
    if (!course) {
      throw new NotFoundException(`Course dengan ID ${id} tidak ditemukan.`);
    }
    return course;
  }
}
