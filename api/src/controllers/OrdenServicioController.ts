import { Request, Response } from 'express';

import { OrdenServicio } from '@/models/OrdenServicio';
import { FindOneOptions, getRepository } from 'typeorm';

export const createOrdenServicio = async (req: Request, res: Response) => {
  const { numOrden, empresaId } = req.body;
  try {
    const [orden] = getRepository(OrdenServicio).create([
      {
        numOrden,
        empresa: { id: empresaId },
      },
    ]);
    await orden.save();
    return res.status(201).send(orden);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOrdenes = async (_req: Request, res: Response) => {
  try {
    const ordenes = await getRepository(OrdenServicio).find();
    return res.send(ordenes);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getOrdenServicioById = async (req: Request, res: Response) => {
  const returnRelations = req.query.relations === 'true';
  const options: FindOneOptions<OrdenServicio> = returnRelations
    ? { relations: ['historias', 'items'] }
    : {};
  try {
    const orden = await getRepository(OrdenServicio).findOne(
      req.params.ordenId,
      options
    );
    if (orden) {
      return res.status(200).send(orden);
    }
    return res.status(404).send({ msg: 'No encontrado' });
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * Solo se puede hacer update a `estado` y `numOrden`
 */
export const updateOrdenServicioById = async (req: Request, res: Response) => {
  const { estado, numOrden } = req.body;
  try {
    const orden = await getRepository(OrdenServicio).findOne(
      req.params.ordenId
    );
    if (orden) {
      orden.estado = estado ? estado : orden.estado;
      orden.numOrden = numOrden ? numOrden : orden.numOrden;
      await orden.save();
      return res.status(200).send(orden);
    }
    return res.status(404).send({ msg: 'No encontrado' });
  } catch (err) {
    return res.status(500).send(err);
  }
};
