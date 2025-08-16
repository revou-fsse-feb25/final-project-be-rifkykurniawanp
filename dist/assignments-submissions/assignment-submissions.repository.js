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
exports.AssignmentSubmissionsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentSubmissionsRepository = class AssignmentSubmissionsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    submit(dto) {
        return this.prisma.assignmentSubmission.create({ data: dto });
    }
    findAll() {
        return this.prisma.assignmentSubmission.findMany();
    }
    findOne(id) {
        return this.prisma.assignmentSubmission.findUnique({ where: { id } });
    }
    update(id, dto) {
        return this.prisma.assignmentSubmission.update({ where: { id }, data: dto });
    }
    remove(id) {
        return this.prisma.assignmentSubmission.delete({ where: { id } });
    }
};
exports.AssignmentSubmissionsRepository = AssignmentSubmissionsRepository;
exports.AssignmentSubmissionsRepository = AssignmentSubmissionsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentSubmissionsRepository);
//# sourceMappingURL=assignment-submissions.repository.js.map