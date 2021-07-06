export const CORS_ORIGIN_WHITELIST = process.env.CORS_ORIGIN_WHITELIST?.split(',') || ['http://localhost:8080'];

export const {
  DB_URI = '',
  API_PORT = 8080,
  SALT_ROUNDS = 10,
  SESSION_SECRET = 'secret',
  SESSION_NAME = 'ssiud',
} = process.env;
