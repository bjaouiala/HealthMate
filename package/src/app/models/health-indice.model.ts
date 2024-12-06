
import { User } from './user.model'; // Assuming there's a User model.

export interface HealthIndice {
  id?: number;
  age?: number;
  systolicBP?: number;
  diastolicBP?: number;
  bs?: number; // Blood Sugar level
  bodyTemp?: number; // Body Temperature
  heartRate?: number; // Heart Rate
}
