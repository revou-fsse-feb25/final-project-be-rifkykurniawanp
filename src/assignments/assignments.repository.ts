// src/assignments/assignments.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Assignment, AssignmentSubmission, Prisma } from '@prisma/client';
import { IAssignmentsRepository, CreateAssignmentData, UpdateAssignmentData, CreateSubmissionData, UpdateSubmissionData } from './interfaces/assignments.repository.interface';

@Injectable()
export class AssignmentsRepository implements IAssignmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ================= ASSIGNMENT METHODS =================
  async create(data: CreateAssignmentData): Promise<Assignment> {
    return this.prisma.assignment.create({
      data,
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findById(id: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment | null> {
    return this.prisma.assignment.findFirst({
      where: { id, ...where },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findByIdIncludingDeleted(id: number): Promise<Assignment | null> {
    return this.prisma.assignment.findUnique({
      where: { id },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findByLessonId(lessonId: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where: { lessonId, ...where },
      orderBy: { createdAt: 'desc' },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findByCourseId(courseId: number, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where: {
        lesson: {
          module: {
            courseId
          }
        },
        ...where
      },
      orderBy: { createdAt: 'desc' },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findAll(skip = 0, take = 10, where?: Prisma.AssignmentWhereInput): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findDeleted(skip = 0, take = 10): Promise<Assignment[]> {
    return this.prisma.assignment.findMany({
      where: { deletedAt: { not: null } },
      skip,
      take,
      orderBy: { deletedAt: 'desc' },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async update(id: number, data: UpdateAssignmentData): Promise<Assignment> {
    return this.prisma.assignment.update({
      where: { id },
      data,
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async softDelete(id: number): Promise<Assignment> {
    return this.prisma.assignment.update({
      where: { id },
      data: { deletedAt: new Date() },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async hardDelete(id: number): Promise<Assignment> {
    return this.prisma.assignment.delete({
      where: { id },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async restore(id: number): Promise<Assignment> {
    return this.prisma.assignment.update({
      where: { id },
      data: { deletedAt: null },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true
              }
            }
          }
        },
        submissions: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async countByLesson(lessonId: number, where?: Prisma.AssignmentWhereInput): Promise<number> {
    return this.prisma.assignment.count({
      where: { lessonId, ...where }
    });
  }

  async countByCourse(courseId: number, where?: Prisma.AssignmentWhereInput): Promise<number> {
    return this.prisma.assignment.count({
      where: {
        lesson: {
          module: {
            courseId
          }
        },
        ...where
      }
    });
  }

  // ================= SUBMISSION METHODS =================
  async createSubmission(data: CreateSubmissionData): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.create({
      data,
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async findSubmissionById(id: number): Promise<AssignmentSubmission | null> {
    return this.prisma.assignmentSubmission.findUnique({
      where: { id },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async findSubmissionByUserAndAssignment(userId: number, assignmentId: number): Promise<AssignmentSubmission | null> {
    return this.prisma.assignmentSubmission.findFirst({
      where: { userId, assignmentId },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async findSubmissionsByAssignment(assignmentId: number): Promise<AssignmentSubmission[]> {
    return this.prisma.assignmentSubmission.findMany({
      where: { assignmentId },
      orderBy: { submittedAt: 'desc' },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async findSubmissionsByUser(userId: number): Promise<AssignmentSubmission[]> {
    return this.prisma.assignmentSubmission.findMany({
      where: { userId },
      orderBy: { submittedAt: 'desc' },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async updateSubmission(id: number, data: UpdateSubmissionData): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.update({
      where: { id },
      data,
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async deleteSubmission(id: number): Promise<AssignmentSubmission> {
    return this.prisma.assignmentSubmission.delete({
      where: { id },
      include: {
        assignment: {
          include: {
            lesson: {
              include: {
                module: {
                  include: {
                    course: true
                  }
                }
              }
            }
          }
        },
        user: true
      }
    });
  }

  async countSubmissionsByAssignment(assignmentId: number): Promise<number> {
    return this.prisma.assignmentSubmission.count({
      where: { assignmentId }
    });
  }

  async countSubmissionsByUser(userId: number): Promise<number> {
    return this.prisma.assignmentSubmission.count({
      where: { userId }
    });
  }

  async countGradedSubmissionsByAssignment(assignmentId: number): Promise<number> {
    return this.prisma.assignmentSubmission.count({
      where: { 
        assignmentId,
        grade: { not: null }
      }
    });
  }
}