export const {
  NODE_ENV = 'development',
  DB_URI = '',
  SALT_ROUNDS = 10,
  SESSION_NAME = 'suid',
  SECRET_KEY = 'secret',
} = process.env;
