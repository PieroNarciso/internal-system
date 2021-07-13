export {};

declare module 'express-session' {
  interface SessionData {
    userUuid?: string;
  }
}
