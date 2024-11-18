export interface HealthGoal {
  id: number;
  title: string;
  description: string;
  actualValue?: number;
  targetValue?: number;
  startDate?: string;
  endDate?: string;
  userDescription?: string;
  status?: string;
}

export interface PredefinedHealthGoal {
  id: number;
  title: string;
  description: string;
}

