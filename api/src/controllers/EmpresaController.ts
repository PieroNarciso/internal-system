import { NextFunction, Request, Response } from 'express';

import EmpresaService from '@/services/EmpresaService';

export const createEmpresa = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const empresa = await EmpresaService.create({
      razonSocial: req.body.razonSocial,
      ruc: req.body.ruc
    });
    return res.status(201).send(empresa);
  } catch (err) {
    next(err);
  }
};

export const getEmpresaById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const empresa = await EmpresaService.findById(parseInt(req.params.empresaId));
    return res.status(200).send(empresa);
  } catch (err) {
    next(err);
  }
};

export const fetchAllEmpresas = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const empresas = await EmpresaService.fetchAll();
    return res.status(200).send(empresas);
  } catch (err) {
    next(err);
  }
};
