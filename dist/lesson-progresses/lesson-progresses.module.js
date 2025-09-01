"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonProgressesModule = void 0;
const common_1 = require("@nestjs/common");
const lesson_progresses_service_1 = require("./lesson-progresses.service");
const lesson_progresses_controller_1 = require("./lesson-progresses.controller");
const lesson_progresses_repository_1 = require("./lesson-progresses.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let LessonProgressesModule = class LessonProgressesModule {
};
exports.LessonProgressesModule = LessonProgressesModule;
exports.LessonProgressesModule = LessonProgressesModule = __decorate([
    (0, common_1.Module)({
        controllers: [lesson_progresses_controller_1.LessonProgressesController],
        providers: [lesson_progresses_service_1.LessonProgressesService, lesson_progresses_repository_1.LessonProgressesRepository, prisma_service_1.PrismaService],
        exports: [lesson_progresses_service_1.LessonProgressesService],
    })
], LessonProgressesModule);
//# sourceMappingURL=lesson-progresses.module.js.map