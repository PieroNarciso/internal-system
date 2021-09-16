import { Role } from '@/types';

export interface UserBase {
  id: number;
  uuid: string;
  username: string;
  email: string;
  role: Role;
}

export interface UserCreate extends Omit<UserBase, 'id' | 'uuid' | 'role'> {
  password: string;
}

export interface UserLogin {
  username: string;
  password: string;
}

export interface User extends UserBase {}
