import { createConnection } from 'typeorm';
import path from 'path';

import { DB_URI } from '@/config/env';


export const dbConnection = async (): Promise<void> => {
  await createConnection({
    type: 'postgres',
    url: DB_URI,
    entities: [path.resolve(__dirname, '../models/**/*.ts')],
    synchronize: true,
  });
  console.log('DB Connected');
};
