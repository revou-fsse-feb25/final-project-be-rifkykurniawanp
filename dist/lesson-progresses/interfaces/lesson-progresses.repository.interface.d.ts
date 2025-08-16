export interface ILessonProgressesRepository {
    findOne(userId: number, lessonId: number): any;
    markCompleted(userId: number, lessonId: number): any;
    findAllByUser(userId: number): any;
}
