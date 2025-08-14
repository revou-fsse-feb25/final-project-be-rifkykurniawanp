import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersRepository } from './user.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    PrismaService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
