export interface ILessonProgressesRepository {
  findOne(userId: number, lessonId: number);
  markCompleted(userId: number, lessonId: number);
  findAllByUser(userId: number);
}
