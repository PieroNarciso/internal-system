import { OpenAPIV3 } from 'openapi-types';


export const tipoComponents: OpenAPIV3.ComponentsObject['schemas'] = {
  HistoriaTipoNombre: {
    type: 'string',
    enum: ['despacho', 'produccion'],
  },
  Tipo: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      uuid: {
        type: 'string',
      },
      nombre: {
        $ref: '#/components/schemas/HistoriaTipoNombre',
      }
    },
  }
};

export const tipoPaths: OpenAPIV3.PathsObject = {
  '/tipos': {
    get: {
      description: 'Get list of Tipos',
      tags: ['Tipo'],
      responses: {
        '200': {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Tipo',
                }
              }
            }
          }
        },
        '500': {
          description: 'Internal Error',
        }
      }
    },
    post: {
      description: 'Create Tipo',
      tags: ['Tipo'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                tipoName: {
                  $ref: '#/components/schemas/HistoriaTipoNombre',
                }
              }
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Successfully created',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Tipo',
              }
            },
          }
        }
      },
    }
  }
};
