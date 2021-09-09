import { NextFunction, Request, Response } from 'express';

import TipoService from '@/services/TipoService';


export const createTipo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tipo = await TipoService.create({ tipoName: req.body.tipoName });
    return res.status(201).send(tipo);
  } catch (err) {
    return next(err);
  }
};


export const getTipos = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tipos = await TipoService.findAll();
    return res.status(200).send(tipos);
  } catch (err) {
    return next(err);
  }
};
