import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Historia } from '@/models/Historia';


export const createHistoria = async (req: Request, res: Response) => {
  const { peso, ordenId, itemId, tipoId } = req.body;
  try {
    const historia = getRepository(Historia).create({
      peso: parseFloat(peso),
      orden: { id: ordenId },
      item: { id: itemId },
      tipo: { id: tipoId },
    });
    await historia.save();
    return res.status(201).send(historia);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

export const getHistoriaById = async (req: Request, res: Response) => {
  const { historiaId } = req.body;
  if (!historiaId)
    return res.status(400).send('No Encontrado');
  try {
    const historia = await getRepository(Historia).findOne({ id: historiaId });
    if (historia) {
      return res.status(200).send(historia);
    }
    return res.status(404).send('No Encontrado');
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getHistoriasByOrdenId = async (req: Request, res: Response) => {
  const { ordenId } = req.body;
  if (!ordenId)
    return res.status(400).send('Error');
  try {
    const historias = await getRepository(Historia).find({
      where: {
        orden: { id: ordenId }
      },
      order: {
        createdAt: 'DESC',
      }
    });
    return res.status(200).send(historias);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getHistoriasByItemId = async (req: Request, res: Response) => {
  const { itemId } = req.body;
  try {
    const historias = await getRepository(Historia).find({
      where: {
        item: { id: itemId }
      }
    });
    return res.status(200).send(historias);
  } catch (err) {
    return res.status(500).send(err);
  }
};
