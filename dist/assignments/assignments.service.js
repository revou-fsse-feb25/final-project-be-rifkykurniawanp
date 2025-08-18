"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const assignments_repository_1 = require("./assignments.repository");
let AssignmentsService = class AssignmentsService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async create(dto, user) {
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
    async findOne(id) {
        const assignment = await this.repository.findOne(id);
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        return {
            success: true,
            message: 'Assignment retrieved successfully',
            data: {
                ...assignment,
                isOverdue: this.isAssignmentOverdue(assignment.dueDate),
            },
        };
    }
    async update(id, dto, user) {
        const assignment = await this.repository.findOne(id);
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        this.validateAssignmentDates(dto);
        const updatedAssignment = await this.repository.update(id, dto);
        return {
            success: true,
            message: 'Assignment updated successfully',
            data: updatedAssignment,
        };
    }
    async remove(id, user) {
        const assignment = await this.repository.findOne(id);
        if (!assignment) {
            throw new common_1.NotFoundException('Assignment not found');
        }
        await this.repository.remove(id);
        return {
            success: true,
            message: 'Assignment deleted successfully',
            data: null,
        };
    }
    isAssignmentOverdue(dueDate) {
        if (!dueDate)
            return false;
        return new Date() > new Date(dueDate);
    }
    validateAssignmentDates(dto) {
        if (dto.dueDate) {
            const dueDate = new Date(dto.dueDate);
            const now = new Date();
            if (dueDate <= now) {
                throw new common_1.BadRequestException('Due date must be in the future');
            }
            const oneYearFromNow = new Date();
            oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);
            if (dueDate > oneYearFromNow) {
                throw new common_1.BadRequestException('Due date cannot be more than 1 year in the future');
            }
        }
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [assignments_repository_1.AssignmentsRepository])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map