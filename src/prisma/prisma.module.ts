import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // biar bisa di-inject di module lain
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
