import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { createClient } from 'redis';
import connectRedis from 'connect-redis';

import { globalRouter } from '@/routes';
import { dbConnection } from '@/config/db';
import { API_PORT, CORS_ORIGIN_WHITELIST, SESSION_NAME, SESSION_SECRET, REDIS_URL } from '@/config/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Express Session
const redisClient = createClient({ url: REDIS_URL });
const RedisStore = connectRedis(session);
app.use('/', session({
  name: SESSION_NAME,
  secret: SESSION_SECRET,
  store: new RedisStore({ client: redisClient }),
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: false,
    httpOnly: true,
  }
}));

app.use(cors({
  origin: CORS_ORIGIN_WHITELIST,
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));


// /** Global Routing */
globalRouter(app);

app.listen(API_PORT, async () => {
  /** DB Connection */
  await dbConnection();
  console.log(`Server started in port ${API_PORT}`);
});
