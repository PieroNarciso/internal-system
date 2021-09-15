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
      email: 'test@test.com',
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

  it('should throw error with uuid that does not exists', async () => {
    try {
      await UserService.findByUuid('fakeuuid');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should find a user with uuid that exists', async () => {
    const userCreated = await UserService.create({
      username: 'test',
      password: 'test',
      email: 'test@test.com',
    });
    const user = await UserService.findByUuid(userCreated.uuid);
    expect(user.username).toBe(userCreated.username);
  });

  it('should return true if a password is correct', async () => {
    const credentials = {
      username: 'test',
      password: 'test',
    };
    const user = await UserService.create({
      username: credentials.username,
      password: credentials.password,
      email: 'test@test.com',
    });
    const isValid = await UserService.verifyPasswordValidity(
      credentials.password,
      user.password
    );
    expect(isValid).toBe(true);
  });

  it('should return false if a password is incorrect', async () => {
    const credentials = {
      username: 'test',
      password: 'test',
    };
    const user = await UserService.create({
      username: credentials.username,
      password: credentials.password,
      email: 'test@test.com',
    });
    const isValid = await UserService.verifyPasswordValidity(
      'incorrectpassword',
      user.password
    );
    expect(isValid).toBe(false);
  });

  it('should find a user by credentials that exists', async () => {
    const credentials = {
      username: 'test',
      password: 'test',
    };
    await UserService.create({
      username: credentials.username,
      password: credentials.password,
      email: 'test@test.com',
    });
    const user = await UserService.findByCredentials(
      credentials.username,
      credentials.password
    );
    expect(user.username).toBe(credentials.username);
  });

  it('should not find a user by credential that does not exists', async () => {
    const credentials = {
      username: 'test',
      password: 'test',
    };
    try {
      await UserService.findByCredentials(
        credentials.username, credentials.password
      );
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
