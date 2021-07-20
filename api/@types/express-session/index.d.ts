import { Role } from '@/types';
export {};

declare module 'express-session' {
  interface SessionData {
    userUuid?: string;
    userRole?: Role;
  }
}
