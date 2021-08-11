import { OpenAPIV3 } from 'openapi-types';
import { userComponents, userPaths } from '@/docs/user';


const components: OpenAPIV3.ComponentsObject = {
  schemas: {
    ...userComponents,
  }
};

const tags: OpenAPIV3.TagObject[] = [
  { name: 'User' },
  { name: 'Empresa' },
];

const paths: OpenAPIV3.PathsObject= {
  ...userPaths,
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
