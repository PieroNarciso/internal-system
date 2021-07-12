import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';

import { Usuario } from '@/models/Usuario';
import { SALT_ROUNDS } from '@/config/env';

/**
 * Registro de usuario
 * - Body: { username: string, email: string, password: string, rol?: Role }
 */
export const createUser = async (req: Request, res: Response) => {
  if (!req.body.password || !req.body.username || !req.body.email) {
    return res
      .status(400)
      .send({ msg: 'El usuario y contraseña son requeridos' });
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const [user] = getRepository(Usuario).create([{ ...req.body }]);
    await user.save();

    return res.status(201).send({ ...user, password: undefined });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Obtiene el usuario por el `uuid`, recibe como parametro el `uuid` en
 * `Request.params`
 */
export const getUserByUuid = async (req: Request, res: Response) => {
  try {
    const user = await getRepository(Usuario).findOne({
      uuid: req.params.uuid,
    });
    if (user) {
      return res.status(200).send(user);
    }
    return res.status(404).send({ msg: 'El usuario no existe' });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

/**
 * Login user with body => { username: string, password: string }
 */
export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await getRepository(Usuario).findOne(
      { username: req.body.username },
      { select: ['uuid', 'username', 'password'] }
    );
    if (user) {
      const isValid = await bcrypt.compare(req.body.password, user.password);
      if (isValid) {
        req.session.userID = user.id;
        return res.status(200).send({ ...user, password: undefined });
      } else {
        return res.status(404).send({ msg: 'Usuario o contraseña incorrecta' });
      }
    }
    return res.status(404).send({ msg: 'Usuario o contraseña incorrecta' });
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
};
