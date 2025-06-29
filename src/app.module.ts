import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductModule } from './product/product.module';
import { CourseModule } from './course/course.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, ProductModule, CourseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
