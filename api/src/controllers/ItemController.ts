import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Item } from '@/models/Item';


export const createItem = async (req: Request, res: Response) => {
  const { nombre, totalDespachar, ordenId } = req.body;
  try {
    const item = getRepository(Item).create({
      nombre,
      totalDespachar,
      orden: { id: ordenId },
      historias: [],
    });
    await item.save();
    return res.status(201).send(item);
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await getRepository(Item).findOne(req.params.itemId);
    if (item)
      return res.status(200).send(item);
    return res.status(404).send('No Encontrado');
  } catch (err) {
    return res.status(500).send(err);
  }
};

export const getItemsByOrdenId = async (req: Request, res: Response) => {
  const { ordenId } = req.params;
  if (!ordenId)
    return res.status(400).send('No encontrado');
  try {
    const items = await getRepository(Item).find({
      where: {
        orden: { id: ordenId }
      }
    });
    return res.status(200).send(items);
  } catch (err) {
    return res.status(500).send(err);
  }
};
