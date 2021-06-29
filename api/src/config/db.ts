import { createConnection } from 'typeorm';

import { DB_URI } from '@/config/env';


export default createConnection({
  type: 'postgres',
  url: DB_URI,
  entities: ['../api/models/*.ts'],
  synchronize: true,
});
