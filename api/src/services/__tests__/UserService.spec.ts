import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

import { Usuario } from '../../models/Usuario';
import UserService from '../UserService';

export const USER_USUARIO_ROLE_DATA = {
  username: 'test',
  password: 'test',
  email: 'test@test.com',
};

export const testsUserIntancesInitialize = async () => {
  await Usuario.create({
    username: USER_USUARIO_ROLE_DATA.username,
    password: USER_USUARIO_ROLE_DATA.password,
    email: USER_USUARIO_ROLE_DATA.email,
  }).save();
};
export const NUMBER_USER_INSTANCES_INITIALIZED = 1;

beforeAll(async () => {
  await dbConnection();
});

afterEach(async () => {
  await getConnection().synchronize(true);
});

afterAll(async () => {
  await getConnection().close();
});

describe('UserService create method', () => {
  it('should create an user', async () => {
    await UserService.create({
      username: 'test',
      password: 'test',
      email: 'test@test.com',
    });
    const user = await UserService.findByUsername('test');
    expect(user).toBeInstanceOf(Usuario);
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

  it('should hash the password of the user on create', async () => {
    const password = 'test';
    const user = await UserService.create({
      username: 'test',
      password: 'test',
      email: 'test@test.com',
    });
    expect(user.password !== password).toBe(true);
  });
});

describe('UserService findByUsername method', () => {
  it('should find a user by username attribute', async () => {
    await testsUserIntancesInitialize();
    const user = await UserService.findByUsername(
      USER_USUARIO_ROLE_DATA.username
    );
    expect(user).toBeInstanceOf(Usuario);
  });

  it('should not find a username that does not exists', async () => {
    try {
      await UserService.findByUsername('notExistingUsername');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});

describe('UserService findByUuid method', () => {
  it('should throw error with uuid that does not exists', async () => {
    try {
      await UserService.findByUuid('fakeuuid');
    } catch (err) {
      expect(err).toBeDefined();
    }
  });

  it('should find a user with uuid that exists', async () => {
    await testsUserIntancesInitialize();
    const userCreated = await Usuario.findOne();
    const user = await UserService.findByUuid(userCreated!.uuid);
    expect(user.username).toBe(userCreated!.username);
  });
});

describe('UserService verifyPasswordValidity method', () => {
  it('should return true if a password is correct', async () => {
    const user = await UserService.create({
      username: USER_USUARIO_ROLE_DATA.username,
      password: USER_USUARIO_ROLE_DATA.password,
      email: USER_USUARIO_ROLE_DATA.email,
    });
    const isValid = await UserService.verifyPasswordValidity(
      USER_USUARIO_ROLE_DATA.password,
      user.password
    );
    expect(isValid).toBe(true);
  });

  it('should return false if a password is incorrect', async () => {
    const user = await UserService.create({
      username: USER_USUARIO_ROLE_DATA.username,
      password: USER_USUARIO_ROLE_DATA.password,
      email: USER_USUARIO_ROLE_DATA.email,
    });
    const isValid = await UserService.verifyPasswordValidity(
      'incorrectpassword',
      user.password
    );
    expect(isValid).toBe(false);
  });
});

describe('UserService findByCredentials method', () => {
  it('should find a user by credentials that exists', async () => {
    await UserService.create({
      username: USER_USUARIO_ROLE_DATA.username,
      password: USER_USUARIO_ROLE_DATA.password,
      email: USER_USUARIO_ROLE_DATA.email,
    });
    const user = await UserService.findByCredentials(
      USER_USUARIO_ROLE_DATA.username,
      USER_USUARIO_ROLE_DATA.password
    );
    expect(user.username).toBe(USER_USUARIO_ROLE_DATA.username);
  });

  it('should not find a user by credential that does not exists', async () => {
    try {
      await UserService.findByCredentials(
        USER_USUARIO_ROLE_DATA.username,
        USER_USUARIO_ROLE_DATA.password
      );
    } catch (err) {
      expect(err).toBeDefined();
    }
  });
});
