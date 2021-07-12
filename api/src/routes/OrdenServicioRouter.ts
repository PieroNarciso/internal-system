import { Router } from 'express';

import {
  createOrdenServicio,
  getOrdenServicioById,
  updateOrdenServicioById,
} from '@/controllers/OrdenServicioController';

const ordenServicioRouter = Router();

/**
 * Crear orden de servicio
 */
ordenServicioRouter.post('/', createOrdenServicio);

/**
 * Obtener orden por `id`
 */
ordenServicioRouter.get('/:ordenId', getOrdenServicioById);

/**
 * Actualizar orden de servicio por `id`
 * Solo se actualiza `estado` y `numOrden`
 */
ordenServicioRouter.put('/:ordenId', updateOrdenServicioById);


export { ordenServicioRouter };
