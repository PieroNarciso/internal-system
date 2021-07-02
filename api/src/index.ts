import express from 'express';

import { globalRouter } from '@/api/routes';
import { dbConnection } from '@/config/db';
import { API_PORT } from '@/config/env';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/** Global Routing */
globalRouter(app);

app.listen(API_PORT, async () => {
  /** DB Connection */
  await dbConnection();
  console.log(`Server started in port ${API_PORT}`);
});
