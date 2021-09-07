import { OpenAPIV3 } from 'openapi-types';

export const empresaComponents: OpenAPIV3.ComponentsObject['schemas'] = {
  Empresa: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      razonSocial: {
        type: 'string',
      },
      ruc: {
        type: 'string',
      },
    }
  },
  EmpresaCreate: {
    type: 'object',
    properties: {
      razonSocial: {
        type: 'string',
      },
      ruc: {
        type: 'string',
      }
    }
  }
};


export const empresaPaths: OpenAPIV3.PathsObject = {
  '/empresas': {
    post: {
      summary: 'Create empresa instance',
      tags: ['Empresa'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/EmpresaCreate'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Empresa Created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Empresa'
              }
            }
          }
        },
        500: {
          description: 'Server error'
        }
      }
    }
  },
  '/empresas/{empresaId}': {
    get: {
      summary: 'Get empresa by Id',
      tags: ['Empresa'],
      parameters: [
        { name: 'empresaId', in: 'path', required: true }
      ],
      responses: {
        200: {
          description: 'Empresa found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Empresa'
              }
            }
          }
        },
        404: {
          description: 'Not Found',
        },
        500: {
          description: 'Server error'
        }
      }
    }
  }
};
