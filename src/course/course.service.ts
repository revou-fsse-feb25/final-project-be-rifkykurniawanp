import { Injectable, Get } from '@nestjs/common';

@Injectable()
export class CourseService {
  @Get('courses')
  getCourses() {
    return [
      { id: 1, title: 'Course 1', description: 'Description for Course 1' },
      { id: 2, title: 'Course 2', description: 'Description for Course 2' },
      { id: 3, title: 'Course 3', description: 'Description for Course 3' },
    ];
  }
}
