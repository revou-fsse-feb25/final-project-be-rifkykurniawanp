export interface SeedResult {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
  count?: number;
  duration?: number;
}

export interface SeedStats {
  totalSeeded: number;
  totalSkipped: number;
  totalErrors: number;
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

export interface RollbackResult {
  success: boolean;
  message: string;
  tablesCleared?: string[];
  error?: string;
}