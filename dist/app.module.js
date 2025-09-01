"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const products_module_1 = require("./products/products.module");
const product_reviews_module_1 = require("./product-reviews/product-reviews.module");
const courses_module_1 = require("./courses/courses.module");
const course_modules_module_1 = require("./course-modules/course-modules.module");
const lessons_module_1 = require("./lessons/lessons.module");
const lesson_progresses_module_1 = require("./lesson-progresses/lesson-progresses.module");
const assignments_module_1 = require("./assignments/assignments.module");
const assignment_submissions_module_1 = require("./assignments-submissions/assignment-submissions.module");
const carts_module_1 = require("./carts/carts.module");
const payments_module_1 = require("./payments/payments.module");
const product_orders_module_1 = require("./product-orders/product-orders.module");
const product_order_items_module_1 = require("./product-order-items/product-order-items.module");
const course_enrollments_module_1 = require("./course-enrollments/course-enrollments.module");
const certificates_module_1 = require("./certificates/certificates.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            product_reviews_module_1.ProductReviewsModule,
            courses_module_1.CoursesModule,
            course_modules_module_1.CourseModulesModule,
            lessons_module_1.LessonsModule,
            lesson_progresses_module_1.LessonProgressesModule,
            assignments_module_1.AssignmentsModule,
            assignment_submissions_module_1.SubmissionModule,
            carts_module_1.CartsModule,
            payments_module_1.PaymentsModule,
            product_orders_module_1.ProductOrdersModule,
            product_order_items_module_1.ProductOrderItemsModule,
            course_enrollments_module_1.EnrollmentsModule,
            certificates_module_1.CertificatesModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map