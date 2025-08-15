import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProductReviewsModule } from './product-reviews/product-reviews.module';
import { CoursesModule } from './courses/courses.module';
import { CourseModulesModule } from './course-modules/course-modules.module';
import { LessonsModule } from './lessons/lessons.module';
import { LessonProgressesModule } from './lesson-progresses/lesson-progresses.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { AssignmentSubmissionsModule } from './assignments-submissions/assignment-submissions.module';
import { CartsModule } from './carts/carts.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductOrdersModule } from './product-orders/product-orders.module';
import { ProductOrderItemsModule } from './product-order-items/product-order-items.module';
import { CourseEnrollmentsModule } from './course-enrollments/course-enrollments.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    ProductReviewsModule,
    CoursesModule,
    CourseModulesModule,
    LessonsModule,
    LessonProgressesModule,
    AssignmentsModule,
    AssignmentSubmissionsModule,
    CartsModule,
    PaymentsModule,
    ProductOrdersModule,
    ProductOrderItemsModule,
    CourseEnrollmentsModule,
    CertificatesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
