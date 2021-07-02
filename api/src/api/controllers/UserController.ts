import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { Usuario } from '@/api/models/Usuario';
import { SALT_ROUNDS } from '@/config/env';

export const userController = {

  createUser: async (req: Request, res: Response) => {
    if (!req.body.password) {
      return res.status(400).send({ msg: 'Se necesita el password' });
    }
    try {
      req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
      const [user] = getRepository(Usuario).create([{ ...req.body }]);
      await user.save();

      return res.status(201).send({ ...user, password: undefined });
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  /**
   * Obtiene el usuario por el `uuid`, recibe como parametro el `uuid` en
   * `Request.params`
   */
  getUserByUuid: async (req: Request, res: Response) => {
    try {
      const user = await getRepository(Usuario).findOne({ uuid: req.params.uuid });
      if (user) {
        return res.status(200).send(user);
      }
      return res.status(404).send({ msg: 'El usuario no existe' });
    } catch(err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },

  /**
   * Login user with body => { username: string, password: string }
   */
  loginUser: async (req: Request, res: Response) => {
    try{
      const user = await getRepository(Usuario).findOne({ username: req.body.username }, { select: ['uuid', 'username', 'password']});
      if (user) {
        const isValid = await bcrypt.compare(req.body.password, user.password);
        if (isValid) {
          // Login
          return res.status(200).send({ ...user, password: undefined });
        } else {
          return res.status(404).send({ msg: 'Usuario o contraseña incorrecta' });
        }
      }
      return res.status(404).send({ msg: 'Usuario o contraseña incorrecta' });
    } catch(err) {
      console.log(err);
      return res.status(400).send(err);
    }
  }

};
