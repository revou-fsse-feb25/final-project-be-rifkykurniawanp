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
exports.LessonsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonsRepository = class LessonsRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.lesson.create({ data: dto });
    }
    findAllByModule(moduleId) {
        return this.prisma.lesson.findMany({ where: { moduleId } });
    }
    findOne(id) {
        return this.prisma.lesson.findUnique({ where: { id } });
    }
    findBySlug(slug) {
        return this.prisma.lesson.findUnique({ where: { slug } });
    }
    update(id, dto) {
        return this.prisma.lesson.update({ where: { id }, data: dto });
    }
    remove(id) {
        return this.prisma.lesson.delete({ where: { id } });
    }
    getProgress(lessonId, userId) {
        return this.prisma.lessonProgress.findUnique({
            where: { lessonId_userId: { lessonId, userId } },
        });
    }
    completeLesson(lessonId, userId) {
        return this.prisma.lessonProgress.upsert({
            where: { lessonId_userId: { lessonId, userId } },
            create: { lessonId, userId, completed: true },
            update: { completed: true },
        });
    }
    getCourseProgress(courseId, userId) {
        return this.prisma.lessonProgress.findMany({
            where: {
                ...(userId ? { userId } : {}),
                lesson: {
                    module: { courseId },
                },
            },
            include: {
                lesson: {
                    select: {
                        id: true,
                        title: true,
                        moduleId: true,
                        module: {
                            select: { id: true, courseId: true, title: true, orderNumber: true },
                        },
                    },
                },
            },
        });
    }
};
exports.LessonsRepository = LessonsRepository;
exports.LessonsRepository = LessonsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonsRepository);
//# sourceMappingURL=lessons.repository.js.map