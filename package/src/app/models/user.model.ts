import { HealthIndice } from "./health-indice.model";

export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    // Add other roles if necessary
  }
  
  export interface User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phoneNumber: string;
    address: string;
    enabled: boolean;
    accountLocked: boolean;
    createdDate: Date;
    lastModifiesDate: Date;
    role: Role;
  
    healthIndices: HealthIndice[];
  }
