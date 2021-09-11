import { getConnection } from 'typeorm';
import { dbConnection } from '../../config/db';

describe('', () => {
  beforeAll(async () => {
    await dbConnection();
  });
  afterAll(async () => {
    await getConnection().close();
  });
  afterEach(async () => {
    await getConnection().synchronize(true);
  });
});
