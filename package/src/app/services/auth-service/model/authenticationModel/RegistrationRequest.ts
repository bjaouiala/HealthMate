export interface RegistrationRequest{
  firstname?:string
  lastname?:string
  email?:string
  password?:string
  phoneNumber?:string
  address?:string
  role?:Role

}

export enum Role{
  USER="USER",
  ADMIN ="ADMIN",
}
