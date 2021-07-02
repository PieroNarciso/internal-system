import { createConnection } from 'typeorm';

import { DB_URI } from '@/config/env';


export const dbConnection = async (): Promise<void> => {
  await createConnection({
    type: 'postgres',
    url: DB_URI,
    entities: ['./src/api/models/**/*.ts'],
    synchronize: true,
  });
  console.log('DB Connected');
};
