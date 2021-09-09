import { Router } from 'express';

import {
  addHistorToItemInOrdenById,
  addItemToOrdenById,
  createOrdenServicio,
  getOrdenes,
  getOrdenServicioById,
  updateOrdenServicioById,
} from '@/controllers/OrdenServicioController';

const ordenServicioRouter = Router();


ordenServicioRouter.get('/', getOrdenes);
ordenServicioRouter.post('/', createOrdenServicio);
ordenServicioRouter.get('/:ordenId', getOrdenServicioById);
ordenServicioRouter.put('/:ordenId', updateOrdenServicioById);
ordenServicioRouter.post('/:ordenId/items', addItemToOrdenById);
ordenServicioRouter.post('/:ordenId/items/:itemId', addHistorToItemInOrdenById);

export { ordenServicioRouter };
