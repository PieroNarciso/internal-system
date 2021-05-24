import { Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { User } from '@/api/models';
import { SALT_ROUNDS, SESSION_NAME } from '@/config/env';

export const userController = {
  /**
   * Get /users
   *
   * Get All Users
   */
  getUsers: (_req: Request, res: Response) => {
    return res.send({ message: 'All Users Fetch' });
  },

  /**
   * Register a user
   */
  userRegister: async (req: Request, res: Response) => {
    // Verify input
    if (
      !req.body.firstName ||
      !req.body.lastName ||
      !req.body.email ||
      !req.body.password
    ) {
      return res.status(400).send({ msg: 'All fields are required' });
    }

    const userExists = await getRepository(User).findOne({
      where: { email: req.body.email },
    });

    if (userExists) return res.status(400).send({ msg: 'User already exists' });

    // Hash password
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const [user] = getRepository(User).create(req.body);
    const resUser = await getConnection().manager.save(user);
    return res.status(201).send(resUser);
  },

  /**
   * Login User
   */
  userLogin: async (req: Request, res: Response) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ msg: 'Email and Password are required' });
    }

    const user = await getRepository(User).findOne({
      where: { email: req.body.email },
    });

    if (!user)
      return res.status(400).send({ msg: 'Email or Password are invalid' });

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid)
      return res.status(400).send({ msg: 'Email or Password are invalid' });

    req.session.userID = user.id;
    const { password, ...response } = user;
    return res.status(200).send({ response });
  },

  userLogout: async (req: Request, res: Response) => {
    if (!req.session.userID)
      return res.sendStatus(401);

    req.session.destroy(err => {
      if (err)
        return res.status(400).send(err);

      res.clearCookie(SESSION_NAME).send({ msg: 'Logout' });
    });
  },
};
