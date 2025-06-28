import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';
import { BuyerModule } from './buyer/buyer.module';
import { InstructorModule } from './instructor/instructor.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [AdminModule, StudentModule, BuyerModule, InstructorModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
