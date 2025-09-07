import { PrismaClient } from '@prisma/client';
import { BaseSeeder } from '../core/base-seeder';
import { SeedResult, RollbackResult } from '../core/seed-result';
import { SeedContext, SeederConfig } from '../core/seed-context';

export class PermissionSeeder extends BaseSeeder {
  constructor(prisma: PrismaClient, context: SeedContext) {
    const config: SeederConfig = {
      name: 'PermissionSeeder',
      description: 'Seeds system permissions for RBAC',
      dependencies: [], // No dependencies - foundation
      environment: ['development', 'staging', 'production'],
      rollbackSupported: true,
    };
    super(prisma, context, config);
  }

  async seed(): Promise<SeedResult> {
    try {
      const permissions = [
        {
          name: 'VIEW_DASHBOARD',
          description: 'Access to system dashboard and analytics overview'
        },
        {
          name: 'MANAGE_ORDERS',
          description: 'Create, read, update, and manage product orders and fulfillment'
        },
        {
          name: 'MANAGE_PRODUCTS',
          description: 'Full CRUD operations on product catalog and inventory'
        },
        {
          name: 'MANAGE_COURSES',
          description: 'Full CRUD operations on course content and curriculum'
        },
        {
          name: 'MANAGE_USERS',
          description: 'User administration, role assignment, and account management'
        },
        {
          name: 'MANAGE_SEARCH',
          description: 'Search system administration and content indexing management'
        },
      ];

      const client = this.getClient();
      let createdCount = 0;

      for (const permissionData of permissions) {
        const created = await this.safeUpsert(
          client.userPermission,
          permissionData,
          { name: permissionData.name },
          `Permission: ${permissionData.name}`
        );
        
        if (created) {
          createdCount++;
          this.logInfo(`Created permission: ${permissionData.name}`);
        }
      }

      const message = `Successfully seeded ${createdCount} permissions`;
      this.logSuccess(message);

      return {
        success: true,
        message,
        count: createdCount,
        data: { permissions: permissions.map(p => p.name) }
      };

    } catch (error) {
      return this.handleError(error, 'seed permissions');
    }
  }

  async rollback(): Promise<RollbackResult> {
    try {
      const client = this.getClient();
      
      const deleted = await client.userPermission.deleteMany({
        where: {
          name: { 
            in: ['VIEW_DASHBOARD', 'MANAGE_ORDERS', 'MANAGE_PRODUCTS', 
                 'MANAGE_COURSES', 'MANAGE_USERS', 'MANAGE_SEARCH'] 
          }
        }
      });

      this.logSuccess(`Rolled back ${deleted.count} permissions`);

      return {
        success: true,
        message: `Rolled back ${deleted.count} permissions`,
        tablesCleared: ['UserPermission']
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to rollback permissions: ${error.message}`,
        error: error.message
      };
    }
  }
}
