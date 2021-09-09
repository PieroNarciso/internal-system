import { Router } from 'express';

import {
  createUser,
  getUserByUuid,
  loginUser,
  logoutUser,
} from '@/controllers';

const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:uuid', getUserByUuid);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

export { userRouter };
