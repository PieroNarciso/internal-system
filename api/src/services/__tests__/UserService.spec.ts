import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

import { Usuario } from '../../models/Usuario';
import UserService from '../UserService';

describe('UserService unit tests', () => {

  beforeAll(async () => {
    await dbConnection();
  });

  afterEach(async () => {
    await getConnection().synchronize(true);
  });

  afterAll(async () => {
    await getConnection().close();
  });

  it('should create an user', async () => {
    await UserService.create({
      username: 'test',
      password: 'test',
      email: 'test@test.com'
    });
    const user = await UserService.findByUsername('test');
    expect(user).toBeInstanceOf(Usuario);
  });

  it('should hash the password of the user on create', async () => {
    const password = 'test';
    await UserService.create({
      username: 'test',
      password: 'test',
      email: 'test@test.com',
    });
    const user = await UserService.findByUsername('test');
    expect(user.password !== password).toBe(true);
  });

  it('should fail by creating an user with invalid email', async () => {
    try {
      await UserService.create({
        username: 'test',
        password: 'test',
        email: 'email',
      });
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should find a username by username attribute', async () => {
    const username = 'test';
    await UserService.create({
      username: username,
      password: 'test',
      email: 'test@test.com',
    });
    const user = await UserService.findByUsername(username);
    expect(user).toBeInstanceOf(Usuario);
  });
});
