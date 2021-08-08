import { Response, Request, NextFunction } from 'express';
import { Role } from '@/types';


/**
  * Authentication solo el admin puede pasar el middleware
  * En caso no sea un administrador, se retorna `401`
  */
export const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userRole === Role.ADMIN) {
    return next();
  }
  return res.sendStatus(401);
};

export const authSession = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.userUuid) {
    return next();
  }
  return res.sendStatus(401);
};
