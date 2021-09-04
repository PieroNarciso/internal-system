import { getRepository } from 'typeorm';
import { Usuario } from '@/models/Usuario';
import bcrypt from 'bcrypt';

import { SALT_ROUNDS } from '@/config/env';

class UserService {
  public async create(payload: {
    username: string;
    password: string;
    email: string;
  }): Promise<Usuario> {
    if (!payload.username || !payload.password || !payload.email) {
      throw new Error('Missing attributes');
    }
    try {
      payload.password = await bcrypt.hash(payload.password, SALT_ROUNDS);
      const user = getRepository(Usuario).create({
        ...payload,
      });
      await user.save();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByUsername(
    username: string,
    includePassword = false
  ): Promise<Usuario> {
    if (!username) throw new Error('Not username');
    try {
      const select: (keyof Usuario)[] = ['uuid', 'username'];
      if (includePassword) select.push('password');
      const user = await getRepository(Usuario).findOne(
        { username },
        { select }
      );
      if (user) {
        return user;
      } else throw new Error('404');
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByUuid(uuid: string): Promise<Usuario> {
    try {
      const user = await getRepository(Usuario).findOne({ uuid });
      if (user) return user;
      throw new Error('404');
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findByCredentials(
    username: string,
    password: string
  ): Promise<Usuario> {
    if (!username || !password) throw Error('No credentials provided');
    try {
      const user = await this.findByUsername(username, true);
      if (user && this.verifyPasswordValidity(password, user.password)) {
        return user;
      } else throw new Error('Incorrect Credential');
    } catch (err) {
      throw new Error(err);
    }
  }

  public async verifyPasswordValidity(
    password: string,
    hash: string
  ): Promise<boolean> {
    try {
      const isValid = await bcrypt.compare(password, hash);
      if (isValid) return true;
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new UserService();
