export interface PredefinedGoal {
  id: number;
  title: string;
  description: string;
}


export interface HealthGoal {
  id: number;
  goalTitle : string;
  goalDescription : string;
  actualValue: number;
  targetValue: number;
  startDate: string;
  endDate: string;
  userDescription: string;
  status: string;
}

