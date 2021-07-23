import { Role } from '@/types';

export interface User {
  uuid?: string;
  username?: string;
  email?: string;
  role?: Role;
};
