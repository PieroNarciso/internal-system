import { NextFunction, Request, Response } from 'express';

import OrdenService from '@/services/OrdenService';
import ItemService from '@/services/ItemService';
import HistoryService from '@/services/HistoryService';

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
    return next(err);
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
    return next(err);
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
        numOrden: req.body.numOrden,
      }
    );
    if (!isUpdated) throw new Error('Not Found');
    return res.sendStatus(200);
  } catch (err) {
    return next(err);
  }
};

export const addItemToOrdenById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const item = await ItemService.create({
      ordenId: parseInt(req.params.ordenId),
      name: req.body.name,
      totalDespachar: req.body.totalDespachar,
    });
    return res.status(201).send(item);
  } catch (err) {
    return next(err);
  }
};

export const addHistorToItemInOrdenById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const history = await HistoryService.create({
      tipoId: req.body.tipoId,
      peso: req.body.peso,
      itemId: parseInt(req.params.itemId),
      ordenId: parseInt(req.params.ordenId),
    });
    return res.status(201).send(history);
  } catch (err) {
    return next(err);
  }
};
