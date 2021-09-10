import { getConnection, getRepository } from 'typeorm';
import { dbConnection } from '../config/db';

import { Tipo } from '../models/Tipo';

describe('Tipo Service unit tests', () => {
  beforeEach(async () => {
    await dbConnection();
  });
  afterEach(async () => {
    await getConnection().close();
  });

  test('Example', async () => {
    const tipos = await getRepository(Tipo).find();
    expect(tipos.length).toBe(0);
  });
});
