import { OpenAPIV3 } from 'openapi-types';


export const ordenComponents: OpenAPIV3.ComponentsObject['schemas'] = {
  Orden: {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      numOrden: {
        type: 'string'
      },
      estado: {
        $ref: '#/components/schemas/EstadoOrdenServicio'
      },
      totalDespachado: {
        type: 'number',
      },
      totalDespachar: {
        type: 'number'
      }
    }
  },
  Item: {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
      },
      nombre: {
        type: 'string'
      },
      totalDespachado: {
        type: 'number',
      },
      totalDespachar: {
        type: 'number',
      },
    }
  },
  Historia: {
    type: 'object',
    properties: {
      uuid: {
        type: 'string',
      },
      itemId: {
        type: 'number',
      },
      peso: {
        type: 'number'
      },
      tipo: {
        $ref: '#/components/schemas/HistoriaTipoNombre',
      },
      createdAt: {
        type: 'string',
      },
    }
  },
  OrdenDetail: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
      numOrden: {
        type: 'string',
      },
      estado: {
        $ref: '#/components/schemas/EstadoOrdenServicio',
      },
      totalDespachado: {
        type: 'number',
      },
      totalDespachar: {
        type: 'number',
      },
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Item',
        }
      },
      historias: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/Historia',
        }
      }
    }
  },
};

export const ordenPaths: OpenAPIV3.PathsObject = {
  '/ordenes': {
    get: {
      summary: 'Get list of Ordenes',
      tags: ['Orden'],
      responses: {
        '200': {
          description: 'Successful',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Orden'
                }
              }
            }
          }
        },
        '500': {
          description: 'Server Error'
        }
      }
    }
  },
  '/ordenes/{ordenId}': {
    get: {
      summary: 'Get Detail Orden Object by Id',
      tags: ['Orden'],
      parameters: [
        { name: 'ordenId', required: true, in: 'path' }
      ],
      responses: {
        '200': {
          description: 'Successful',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/OrdenDetail',
              }
            }
          }
        },
        '404': {
          description: 'Not Found',
        }
      }
    }
  }
};
