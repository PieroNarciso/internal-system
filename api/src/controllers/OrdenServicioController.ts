import { NextFunction, Request, Response } from 'express';

import OrdenService from '@/services/OrdenService';

export const createOrdenServicio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.body.empresaId || !req.body.numOrden)
      throw new Error('Missing Attributes');
    const orden = await OrdenService.create({
      empresaId: req.body.empresaId,
      numOrden: req.body.numOrden,
      items: req.body.items,
    });
    return res.status(201).send(orden);
  } catch (err) {
    next(err);
  }
};

export const getOrdenes = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ordenes = await OrdenService.findAll();
    return res.status(200).send(ordenes);
  } catch (err) {
    next(err);
  }
};

export const getOrdenServicioById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orden = await OrdenService.findById(parseInt(req.params.ordenId));
    return res.status(200).send(orden);
  } catch (err) {
    next(err);
  }
};

export const updateOrdenServicioById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const isUpdated = OrdenService.findAndUpdateById(
      parseInt(req.params.ordenId),
      {
        empresaId: req.body.empresaId,
        estado: req.body.estado,
        items: req.body.items,
      }
    );
    if (!isUpdated) throw new Error('Not Found');
    return res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
