import {Router} from 'express';

import { userController } from '@/api/controllers';


const userRouter = Router();

userRouter.post('/', userController.createUser);
userRouter.get('/:uuid', userController.getUserByUuid);
userRouter.post('/login', userController.loginUser);


export { userRouter };

