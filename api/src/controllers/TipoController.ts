import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Tipo } from '@/models/Tipo';


export const createTipo = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const tipo = new Tipo();
    tipo.nombre = nombre;
    await tipo.save();
    return res.status(201).send(tipo);
  } catch (err) {
    return res.status(500).send(err);
  }
};


export const getTipos = async (_req: Request, res: Response) => {
  try {
    const tipos = await getRepository(Tipo).find();
    return res.status(200).send(tipos);
  } catch (err) {
    return res.status(500).send(err);
  }
};


export const getTipoById = async (req: Request, res: Response) => {
  const { tipoId } = req.params;
  if (!tipoId)
    return res.status(400).send('Not Found');
  try {
    const tipo = await getRepository(Tipo).findOne(req.params.tipoId);
    if (tipo) {
      return res.status(200).send(tipo);
    }
    return res.status(404).send('Not Found');
  } catch (err) {
    return res.status(500).send(err);
  }
};
