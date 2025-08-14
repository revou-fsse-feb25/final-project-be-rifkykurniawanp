// roles.module.ts
import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesRepository } from './roles.repository';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust path as needed

@Module({
  imports: [PrismaModule],
  controllers: [RolesController],
  providers: [
    RolesService,
    RolesRepository,
    {
      provide: 'IRolesRepository',
      useClass: RolesRepository,
    },
  ],
  exports: [RolesService, RolesRepository], // Export for use in other modules
})
export class RolesModule {}