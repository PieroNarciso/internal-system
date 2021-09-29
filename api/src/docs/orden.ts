import { OpenAPIV3 } from 'openapi-types';


export const ordenComponents: OpenAPIV3.ComponentsObject['schemas'] = {
  Orden: {
    type: 'object',
    properties: {
      id: {
        type: 'number'
      },
      empresa: {
        $ref: '#/components/schemas/Empresa',
      },
      numOrden: {
        type: 'string'
      },
      estado: {
        $ref: '#/components/schemas/EstadoOrdenServicio'
      },
    }
  },
  Item: {
    type: 'object',
    properties: {
      id: {
        type: 'number',
      },
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
      id: {
        type: 'number',
      },
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
  ItemCreateBody: {
    type: 'object',
    properties: {
      nombre: {
        type: 'string',
        description: 'Item name description',
      },
      totalDespachar: {
        type: 'number',
      },
    }
  },
  ItemEditBody: {
    type: 'object',
    properties: {
      nombre: {
        type: 'string',
      },
      totalDespachar: {
        type: 'number'
      }
    }
  },
  HistoriaCreateBody: {
    type: 'object',
    properties: {
      tipoId: {
        type: 'number'
      },
      peso: {
        type: 'number'
      }
    }
  },
  OrdenEditBody: {
    type: 'object',
    properties: {
      empresaId: {
        type: 'number',
      },
      numOrden: {
        type: 'string',
      },
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ItemEditBody',
        },
      }
    },
  },
  OrdenCreateBody: {
    type: 'object',
    properties: {
      empresaId: {
        type: 'number',
      },
      numOrden: {
        type: 'string',
      },
      items: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/ItemCreateBody',
        }
      }
    },
  }
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
    },
    post: {
      summary: 'Create Orden with Items',
      tags: ['Orden'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/OrdenCreateBody'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Orden created successfully',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                allOf: [
                  { $ref: '#/components/schemas/Orden' },
                  {
                    type: 'object',
                    properties: {
                      items: {
                        type: 'array',
                        items: {
                          $ref: '#/components/schemas/Item',
                        }
                      }
                    }
                  }
                ]
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
    },
    put: {
      summary: 'Edit Orden',
      tags: ['Orden'],
      parameters: [
        { name: 'ordenId', required: true, in: 'path' },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                empresaId: {
                  type: 'number',
                },
                numOrden: {
                  type: 'string',
                },
                estado: {
                  $ref: '#/components/schemas/EstadoOrdenServicio',
                },
                items: {
                  type: 'array',
                  items: {
                    allOf: [
                      {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'number'
                          }
                        },
                      },
                      { $ref: '#/components/schemas/ItemEditBody' },
                    ],
                  }
                }
              }
            }
          }
        }
      },
      responses: {
        '200': {
          description: 'Updated successfully',
        }
      }
    }
  },
  '/ordenes/{ordenId}/items': {
    post: {
      summary: 'Add an Item to the Orden',
      tags: ['Orden', 'Item'],
      parameters: [
        { name: 'ordenId', in: 'path', required: true }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ItemCreateBody',
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Successful added',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Item'
              }
            }
          }
        },
        '404': {
          description: 'Not Found'
        },
        '500': {
          description: 'Server Error'
        }
      }
    }
  },
  '/ordenes/{ordenId}/items/{itemId}': {
    put: {
      summary: 'Edit Item attributes',
      tags: ['Item'],
      parameters: [
        { name: 'ordenId', in: 'path', required: true },
        { name: 'itemId', in: 'path', required: true },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ItemEditBody',
            },
          }
        }
      }
    },
    post: {
      summary: 'Add Historia to Item',
      tags: ['Orden', 'Item', 'Historia'],
      parameters: [
        { name: 'ordenId', in: 'path', required: true },
        { name: 'itemId', in: 'path', required: true }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/HistoriaCreateBody'
            }
          }
        }
      },
      responses: {
        '201': {
          description: 'Added successfully',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Historia',
              }
            }
          }
        },
        '404': {
          description: 'Not Found',
        },
        '500': {
          description: 'Server Error'
        }
      }
    },
  }
};
