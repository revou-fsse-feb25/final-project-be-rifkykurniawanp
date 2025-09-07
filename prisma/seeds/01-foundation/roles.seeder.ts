import { PrismaClient } from '@prisma/client';
import { BaseSeeder } from '../core/base-seeder';
import { SeedResult, RollbackResult } from '../core/seed-result';
import { SeedContext, SeederConfig } from '../core/seed-context';

export class RoleSeeder extends BaseSeeder {
  constructor(prisma: PrismaClient, context: SeedContext) {
    const config: SeederConfig = {
      name: 'RoleSeeder',
      description: 'Seeds user roles (ADMIN, SUPPLIER, INSTRUCTOR, USER)',
      dependencies: [], // No dependencies - foundation
      environment: ['development', 'staging', 'production'],
      rollbackSupported: true,
    };
    super(prisma, context, config);
  }

  async seed(): Promise<SeedResult> {
    try {
      const roles = [
        {
          name: 'ADMIN',
          description: 'System administrator with full access to all features and user management'
        },
        {
          name: 'SUPPLIER',
          description: 'Product supplier with inventory management and order fulfillment capabilities'
        },
        {
          name: 'INSTRUCTOR',
          description: 'Course instructor and content creator with teaching and content management rights'
        },
        {
          name: 'USER',
          description: 'Regular user with basic purchasing and learning capabilities'
        },
      ];

      const client = this.getClient();
      let createdCount = 0;

      for (const roleData of roles) {
        const created = await this.safeUpsert(
          client.userRole,
          roleData,
          { name: roleData.name },
          `Role: ${roleData.name}`
        );
        
        if (created) {
          createdCount++;
          this.logInfo(`Created role: ${roleData.name}`);
        }
      }

      const message = `Successfully seeded ${createdCount} roles`;
      this.logSuccess(message);

      return {
        success: true,
        message,
        count: createdCount,
        data: { roles: roles.map(r => r.name) }
      };

    } catch (error) {
      return this.handleError(error, 'seed roles');
    }
  }

  async rollback(): Promise<RollbackResult> {
    try {
      const client = this.getClient();
      
      // Delete in reverse dependency order
      const deleted = await client.userRole.deleteMany({
        where: {
          name: { in: ['ADMIN', 'SUPPLIER', 'INSTRUCTOR', 'USER'] }
        }
      });

      this.logSuccess(`Rolled back ${deleted.count} roles`);

      return {
        success: true,
        message: `Rolled back ${deleted.count} roles`,
        tablesCleared: ['UserRole']
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to rollback roles: ${error.message}`,
        error: error.message
      };
    }
  }
}