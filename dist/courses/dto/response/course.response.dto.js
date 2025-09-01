"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseResponseDto = exports.InstructorResponseDto = exports.ModuleResponseDto = exports.LessonResponseDto = void 0;
class LessonResponseDto {
    id;
    slug;
    title;
    description;
    duration;
    type;
    videoUrl;
    content;
    quizQuestions;
    passingScore;
    orderNumber;
}
exports.LessonResponseDto = LessonResponseDto;
class ModuleResponseDto {
    id;
    title;
    orderNumber;
    deletedAt;
    lessons;
}
exports.ModuleResponseDto = ModuleResponseDto;
class InstructorResponseDto {
    id;
    firstName;
    lastName;
    email;
}
exports.InstructorResponseDto = InstructorResponseDto;
class CourseResponseDto {
    id;
    title;
    slug;
    description;
    syllabus;
    price;
    rating;
    students;
    duration;
    level;
    category;
    language;
    certificate;
    createdAt;
    instructor;
    modules;
    enrollments;
}
exports.CourseResponseDto = CourseResponseDto;
//# sourceMappingURL=course.response.dto.js.map