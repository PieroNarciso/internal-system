/**
 * Global Import from Routes
 */
import { Router, Express } from 'express';

import { userRouter } from './UserRouter';

const router = Router();

/**
 * Sample Route
 */
router.get('/', (_req, res) => {
  return res.send('Hello World!');
});


export const globalRouter = (app: Express): void => {

  app.use('/', router);

  /**
   * Import Other Routes
   */
  app.use('/users', userRouter);
};
