export enum Role {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

export interface User {
  uuid?: string;
  role?: Role;
}
