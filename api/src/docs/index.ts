import { OpenAPIV3 } from 'openapi-types';
import { userComponents, userPaths } from '@/docs/user';
import { empresaComponents, empresaPaths } from './empresa';
import { ordenComponents, ordenPaths } from './orden';


const components: OpenAPIV3.ComponentsObject = {
  schemas: {
    ...userComponents,
    ...empresaComponents,
    ...ordenComponents,
  }
};

const tags: OpenAPIV3.TagObject[] = [
  { name: 'User' },
  { name: 'Empresa' },
  { name: 'Orden' },
  { name: 'Item' },
  { name: 'Historia' }
];

const paths: OpenAPIV3.PathsObject= {
  ...userPaths,
  ...empresaPaths,
  ...ordenPaths,
};

export const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'Control Produccion RestAPI',
    description: 'Control Produccion Documentacion',
    version: '0.1.0'
  },
  tags,
  components,
  paths
};
