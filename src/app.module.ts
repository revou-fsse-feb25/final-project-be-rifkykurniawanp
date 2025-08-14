import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AccountModule } from './account/account.module';
import { TransactionModule } from './transaction/transaction.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
import { CartsModule } from './carts/carts.module';
import { PaymentsModule } from './payments/payments.module';
import { ProductOrdersModule } from './product-orders/product-orders.module';
import { ProductOrderItemsModule } from './product-order-items/product-order-items.module';
import { CourseEnrollmentsModule } from './course-enrollments/course-enrollments.module';
import { CertificatesModule } from './certificates/certificates.module';
import { AssignmentsSubmissionsModule } from './assignments-submissions/assignments-submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,        // Make config available globally
      envFilePath: '.env',   // Path to .env file
      cache: true,           // Cache environment variables
    }),
    UserModule,
    AccountModule,
    TransactionModule,
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
    CartsModule,
    PaymentsModule,
    ProductOrdersModule,
    ProductOrderItemsModule,
    CourseEnrollmentsModule,
    CertificatesModule,
    AssignmentsSubmissionsModule,
  ],
  controllers: [AppController], // Optional: for health check or general route
  providers: [AppService],      // Optional: if needed
})
export class AppModule {}