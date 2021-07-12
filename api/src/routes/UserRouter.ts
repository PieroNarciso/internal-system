import {Router} from 'express';

import { createUser, getUserByUuid, loginUser } from '@/controllers';


const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/:uuid', getUserByUuid);
userRouter.post('/login', loginUser);


export { userRouter };
