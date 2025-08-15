import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';

@Injectable()
export class AssignmentsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAssignmentDto) {
    return this.prisma.assignment.create({
      data: {
        ...dto,
        instructions: dto.instructions ?? "",
      },
    });
  }

  findAll() {
    return this.prisma.assignment.findMany();
  }

  findOne(id: number) {
    return this.prisma.assignment.findUnique({ where: { id } });
  }

  update(id: number, dto: UpdateAssignmentDto) {
    return this.prisma.assignment.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.assignment.delete({ where: { id } });
  }
}
