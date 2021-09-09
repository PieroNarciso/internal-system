import { NextFunction, Request, Response } from 'express';

import { Role } from '@/types';
import UserService from '@/services/UserService';
import { SESSION_NAME } from '@/config/env';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.password || !req.body.username || !req.body.email) {
      throw new Error('Missing attributes');
    }
    const user = await UserService.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).send({ ...user, password: undefined });
  } catch (err) {
    return next(err);
  }
};

export const getUserByUuid = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await UserService.findByUuid(req.params.uuid);
    return res.status(200).send(user);
  } catch (err) {
    return next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error('No credentials provided');
    }
    const user = await UserService.findByCredentials(
      req.body.username,
      req.body.password
    );
    req.session.userUuid = user.uuid;
    req.session.userRole = user.role as Role;
    return res.status(200).send({ ...user, password: undefined });
  } catch (err) {
    return next(err);
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    else return res.clearCookie(SESSION_NAME).sendStatus(200);
  });
};
