import { BaseSeeder } from './base-seeder';
import { SeedContext, SeederConfig } from './seed-context';

export interface SeederClass {
  new (prisma: any, context: SeedContext): BaseSeeder;
}

export class SeederRegistry {
  private static seeders = new Map<string, SeederClass>();
  private static configs = new Map<string, SeederConfig>();

  static register(name: string, seederClass: SeederClass, config: SeederConfig) {
    this.seeders.set(name, seederClass);
    this.configs.set(name, config);
  }

  static get(name: string): SeederClass | undefined {
    return this.seeders.get(name);
  }

  static getConfig(name: string): SeederConfig | undefined {
    return this.configs.get(name);
  }

  static getAll(): Map<string, SeederClass> {
    return new Map(this.seeders);
  }

  static getAllConfigs(): Map<string, SeederConfig> {
    return new Map(this.configs);
  }

  static clear() {
    this.seeders.clear();
    this.configs.clear();
  }
}