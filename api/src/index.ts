import express from 'express';
import session from 'express-session';

import { globalRouter } from '@/api/routes';
import { SECRET_KEY, NODE_ENV, SESSION_NAME } from '@/config/env';
import db from '@/config/db';

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: SESSION_NAME,
  secret: SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: NODE_ENV == 'development'? false : true,
  }
}));

/** DB Connection */
db
  .then(() => console.log('DB Connected'))
  .catch((err) => console.error(err));

/** Global Routing */
globalRouter(app);

app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
