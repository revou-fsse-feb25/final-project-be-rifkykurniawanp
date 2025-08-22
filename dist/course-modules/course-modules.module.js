"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModulesModule = void 0;
const common_1 = require("@nestjs/common");
const course_modules_controller_1 = require("./course-modules.controller");
const course_modules_service_1 = require("./course-modules.service");
const course_modules_repository_1 = require("./course-modules.repository");
const prisma_module_1 = require("../prisma/prisma.module");
let CourseModulesModule = class CourseModulesModule {
};
exports.CourseModulesModule = CourseModulesModule;
exports.CourseModulesModule = CourseModulesModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [course_modules_controller_1.CourseModulesController],
        providers: [course_modules_service_1.CourseModulesService, course_modules_repository_1.CourseModulesRepository],
        exports: [course_modules_service_1.CourseModulesService, course_modules_repository_1.CourseModulesRepository],
    })
], CourseModulesModule);
//# sourceMappingURL=course-modules.module.js.map