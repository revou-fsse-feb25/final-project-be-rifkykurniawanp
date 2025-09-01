// src/assignments/interfaces/assignments.repository.interface.ts
import { Assignment, AssignmentSubmission, Prisma } from '@prisma/client';

export interface CreateAssignmentData {
  lessonId: number;
  title: string;
  instructions: string;
  dueDate?: Date;
}

export interface UpdateAssignmentData {
  title?: string;
  instructions?: string;
  dueDate?: Date;
}

export interface CreateSubmissionData {
  assignmentId: number;
  userId: number;
  content?: string;
}

export interface UpdateSubmissionData {
  content?: string;
  grade?: number;
}

export interface IAssignmentsRepository {
  // Assignment CRUD operations
  create(data: CreateAssignmentData): Promise<Assignment>;
  findById(id: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment | null>;
  findByIdIncludingDeleted(id: number): Promise<Assignment | null>;
  findByLessonId(lessonId: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]>;
  findByCourseId(courseId: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]>;
  findAll(skip?: number, take?: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]>;
  findDeleted(skip?: number, take?: number): Promise<Assignment[]>;
  update(id: number, data: UpdateAssignmentData): Promise<Assignment>;
  softDelete(id: number): Promise<Assignment>;
  hardDelete(id: number): Promise<Assignment>;
  restore(id: number): Promise<Assignment>;
  countByLesson(lessonId: number, where?: Prisma.AssignmentWhereInput): Promise<number>;
  countByCourse(courseId: number, where?: Prisma.AssignmentWhereInput): Promise<number>;

  // Submission operations
  createSubmission(data: CreateSubmissionData): Promise<AssignmentSubmission>;
  findSubmissionById(id: number): Promise<AssignmentSubmission | null>;
  findSubmissionByUserAndAssignment(userId: number, assignmentId: number): Promise<AssignmentSubmission | null>;
  findSubmissionsByAssignment(assignmentId: number): Promise<AssignmentSubmission[]>;
  findSubmissionsByUser(userId: number): Promise<AssignmentSubmission[]>;
  updateSubmission(id: number, data: UpdateSubmissionData): Promise<AssignmentSubmission>;
  deleteSubmission(id: number): Promise<AssignmentSubmission>;
  countSubmissionsByAssignment(assignmentId: number): Promise<number>;
  countSubmissionsByUser(userId: number): Promise<number>;
  countGradedSubmissionsByAssignment(assignmentId: number): Promise<number>;
}