import { OpenAPIV3 } from 'openapi-types';


const components: OpenAPIV3.ComponentsObject = {
  schemas: {
    Estado: {
      type: 'string',
      enum: ['usuario', 'admin'],
    },
    TipoNombre: {
      type: 'string',
      enum: ['despacho', 'produccion']
    },
    Role: {
      type: 'string',
      enum: ['usuario', 'admin']
    },
    RegisterUser: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string'
        },
        email: {
          type: 'string'
        },
      }
    },
    LoginUser: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        password: {
          type: 'string'
        }
      }
    },
    LoginUserResponse: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
        },
        username: {
          type: 'string'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
        },
        email: {
          type: 'string'
        },
        id: {
          type: 'number',
        },
        uuid: {
          type: 'string',
        },
        role: {
          $ref: '#/components/schemas/Role'
        }
      }
    }
  }
};

const tags: OpenAPIV3.TagObject[] = [
  { name: 'User' },
];

const paths: OpenAPIV3.PathsObject= {
  '/user/login': {
    post: {
      summary: 'Login User',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginUser'
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'User logged',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginUserResponse'
              }
            }
          }
        }
      }
    },
  },
  '/users': {
    post: {
      summary: 'Create an User',
      tags: ['User'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/RegisterUser'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'User created',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/User'
              }
            }
          }
        }
      }
    }
  },
  '/users/{uuid}': {
    get: {
      summary: 'Get user by uuid',
      tags: ['User'],
      parameters: [
        { name: 'uuid', in: 'path', required: true }
      ],
      responses: {
        '200': {
          description: 'User found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        },
        '404': {
          description: 'User not found'
        }
      }
    }
  }
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
