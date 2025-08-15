import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmitAssignmentDto } from './dto/request/submit-assignment.dto';
import { UpdateSubmissionDto } from './dto/request/update-submission.dto';

@Injectable()
export class AssignmentSubmissionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  submit(dto: SubmitAssignmentDto) {
    return this.prisma.assignmentSubmission.create({ data: dto });
  }

  findAll() {
    return this.prisma.assignmentSubmission.findMany();
  }

  findOne(id: number) {
    return this.prisma.assignmentSubmission.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateSubmissionDto) {
    return this.prisma.assignmentSubmission.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.assignmentSubmission.delete({ where: { id } });
  }
}
