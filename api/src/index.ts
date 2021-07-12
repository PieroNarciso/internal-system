import express from 'express';
import session, { MemoryStore } from 'express-session';
import cors from 'cors';
import 'reflect-metadata';

import { globalRouter } from '@/routes';
import { dbConnection } from '@/config/db';
import { API_PORT, CORS_ORIGIN_WHITELIST, SESSION_NAME, SESSION_SECRET } from '@/config/env';

const app = express();

app.use(cors({
  origin: CORS_ORIGIN_WHITELIST,
  credentials: true,
  exposedHeaders: ['Set-Cookie'],
}));

app.use(session({
  name: SESSION_NAME,
  store: new MemoryStore(),
  secret: SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    sameSite: false,
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/** Global Routing */
globalRouter(app);

app.listen(API_PORT, async () => {
  /** DB Connection */
  await dbConnection();
  console.log(`Server started in port ${API_PORT}`);
});
