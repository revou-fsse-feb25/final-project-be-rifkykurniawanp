export class LessonResponseDto {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  duration?: string;
  type: string;
  videoUrl?: string;
  content?: string;
  quizQuestions?: any;
  passingScore: number;
  orderNumber: number;
}

export class ModuleResponseDto {
  id: number;
  title: string;
  orderNumber: number;
  deletedAt?: Date | null; // 🔥 tambahkan ini
  lessons: LessonResponseDto[];
}


export class InstructorResponseDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export class CourseResponseDto {
  id: number;
  title: string;
  slug: string;
  description?: string;
  syllabus?: string;
  price: number;
  rating: number;
  students: number;
  duration?: string;
  level: string;
  category: string;
  language: string;
  certificate: boolean;
  createdAt: Date;

  instructor: InstructorResponseDto;
  modules?: ModuleResponseDto[];
  enrollments?: Array<any>;
}
