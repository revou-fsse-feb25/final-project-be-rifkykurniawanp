import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { AssignmentsRepository } from './assignments.repository';
import { CreateAssignmentDto } from './dto/request/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/request/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly repository: AssignmentsRepository) {}

  async create(dto: CreateAssignmentDto, user: any) {
    // validasi tanggal (opsional)
    this.validateAssignmentDates(dto);

    const assignment = await this.repository.create(dto);

    return {
      success: true,
      message: 'Assignment created successfully',
      data: assignment,
    };
  }

  async findAll() {
    const assignments = await this.repository.findAll();
    return {
      success: true,
      message: 'Assignments retrieved successfully',
      data: assignments,
      meta: { total: assignments.length },
    };
  }

  async findOne(id: number) {
    const assignment = await this.repository.findOne(id);
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    return {
      success: true,
      message: 'Assignment retrieved successfully',
      data: {
        ...assignment,
        isOverdue: this.isAssignmentOverdue(assignment.dueDate as any),
      },
    };
  }

  async update(id: number, dto: UpdateAssignmentDto, user: any) {
    const assignment = await this.repository.findOne(id);
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    // validasi tanggal (opsional)
    this.validateAssignmentDates(dto);

    const updatedAssignment = await this.repository.update(id, dto);

    return {
      success: true,
      message: 'Assignment updated successfully',
      data: updatedAssignment,
    };
  }

  async remove(id: number, user: any) {
    const assignment = await this.repository.findOne(id);
    if (!assignment) {
      throw new NotFoundException('Assignment not found');
    }

    await this.repository.remove(id);

    return {
      success: true,
      message: 'Assignment deleted successfully',
      data: null,
    };
  }

  // helper
  private isAssignmentOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false;
    return new Date() > new Date(dueDate);
  }

  private validateAssignmentDates(dto: CreateAssignmentDto | UpdateAssignmentDto): void {
    if (dto.dueDate) {
      const dueDate = new Date(dto.dueDate);
      const now = new Date();

      if (dueDate <= now) {
        throw new BadRequestException('Due date must be in the future');
      }

      const oneYearFromNow = new Date();
      oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

      if (dueDate > oneYearFromNow) {
        throw new BadRequestException('Due date cannot be more than 1 year in the future');
      }
    }
  }
}
