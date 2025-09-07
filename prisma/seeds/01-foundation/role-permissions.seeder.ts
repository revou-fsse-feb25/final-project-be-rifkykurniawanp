import { PrismaClient } from '@prisma/client';
import { BaseSeeder } from '../core/base-seeder';
import { SeedResult, RollbackResult } from '../core/seed-result';
import { SeedContext, SeederConfig } from '../core/seed-context';

export class RolePermissionSeeder extends BaseSeeder {
  constructor(prisma: PrismaClient, context: SeedContext) {
    const config: SeederConfig = {
      name: 'RolePermissionSeeder',
      description: 'Maps roles to their permissions (RBAC junction table)',
      dependencies: ['RoleSeeder', 'PermissionSeeder'], // Depends on roles and permissions
      environment: ['development', 'staging', 'production'],
      rollbackSupported: true,
    };
    super(prisma, context, config);
  }

  async seed(): Promise<SeedResult> {
    try {
      const client = this.getClient();

      // Get all roles and permissions
      const roles = await client.userRole.findMany();
      const permissions = await client.userPermission.findMany();

      // Create lookup maps
      const roleMap = new Map(roles.map(role => [role.name, role.id]));
      const permissionMap = new Map(permissions.map(perm => [perm.name, perm.id]));

      // Define Role and Permission enums (or import from your models if available)
      enum Role {
        ADMIN = 'ADMIN',
        SUPPLIER = 'SUPPLIER',
        INSTRUCTOR = 'INSTRUCTOR',
        USER = 'USER'
      }

      enum Permission {
        VIEW_DASHBOARD = 'VIEW_DASHBOARD',
        MANAGE_ORDERS = 'MANAGE_ORDERS',
        MANAGE_PRODUCTS = 'MANAGE_PRODUCTS',
        MANAGE_COURSES = 'MANAGE_COURSES',
        MANAGE_USERS = 'MANAGE_USERS',
        MANAGE_SEARCH = 'MANAGE_SEARCH'
      }

      // Define role-permission mappings
      const roleMappings = [
        {
          role: Role.ADMIN,
          permissions: [
            Permission.VIEW_DASHBOARD, Permission.MANAGE_ORDERS, Permission.MANAGE_PRODUCTS, 
            Permission.MANAGE_COURSES, Permission.MANAGE_USERS, Permission.MANAGE_SEARCH
          ]
        },
        {
          role: Role.SUPPLIER,
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_PRODUCTS, Permission.MANAGE_ORDERS]
        },
        {
          role: Role.INSTRUCTOR,
          permissions: [Permission.VIEW_DASHBOARD, Permission.MANAGE_COURSES]
        },
        {
          role: Role.USER,
          permissions: [Permission.VIEW_DASHBOARD]
        }
      ];

      let createdCount = 0;

      for (const mapping of roleMappings) {
        const roleId = roleMap.get(mapping.role);
        if (!roleId) {
          this.logWarning(`Role not found: ${mapping.role}`);
          continue;
        }

        for (const permissionName of mapping.permissions) {
          const permissionId = permissionMap.get(permissionName);
          if (!permissionId) {
            this.logWarning(`Permission not found: ${permissionName}`);
            continue;
          }

          try {
            await client.userRolePermission.create({
              data: {
                roleId,
                permissionId
              }
            });
            
            createdCount++;
            this.logDebug(`Mapped ${mapping.role} → ${permissionName}`);
            
          } catch (error) {
            if (error.code === 'P2002') {
              // Duplicate mapping - skip
              this.logDebug(`Skipped duplicate mapping: ${mapping.role} → ${permissionName}`);
              continue;
            }
            throw error;
          }
        }
      }

      const message = `Successfully created ${createdCount} role-permission mappings`;
      this.logSuccess(message);

      return {
        success: true,
        message,
        count: createdCount,
        data: { mappings: roleMappings }
      };

    } catch (error) {
      return this.handleError(error, 'seed role permissions');
    }
  }

  async rollback(): Promise<RollbackResult> {
    try {
      const client = this.getClient();
      
      const deleted = await client.userRolePermission.deleteMany({});

      this.logSuccess(`Rolled back ${deleted.count} role-permission mappings`);

      return {
        success: true,
        message: `Rolled back ${deleted.count} role-permission mappings`,
        tablesCleared: ['UserRolePermission']
      };

    } catch (error) {
      return {
        success: false,
        message: `Failed to rollback role permissions: ${error.message}`,
        error: error.message
      };
    }
  }
}