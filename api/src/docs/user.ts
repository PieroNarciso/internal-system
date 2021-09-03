import { OpenAPIV3 } from 'openapi-types';

export const userComponents: OpenAPIV3.ComponentsObject['schemas'] = {
  EstadoOrdenServicio: {
    type: 'string',
    enum: ['activo', 'inactivo', 'completado'],
  },
  HistoriaTipoNombre: {
    type: 'string',
    enum: ['despacho', 'produccion'],
  },
  UserRole: {
    type: 'string',
    enum: ['usuario', 'admin'],
  },
  RegisterUser: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
    },
  },
  LoginUser: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      password: {
        type: 'string',
      },
    },
  },
  LoginUserResponse: {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
      },
      username: {
        type: 'string',
      },
      role: {
        $ref: '#/components/schemas/UserRole',
      },
    },
  },
  User: {
    type: 'object',
    properties: {
      username: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      id: {
        type: 'number',
      },
      uuid: {
        type: 'string',
      },
      role: {
        $ref: '#/components/schemas/UserRole',
      },
    },
  },
};

export const userPaths: OpenAPIV3.PathsObject = {
  '/users/login': {
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
