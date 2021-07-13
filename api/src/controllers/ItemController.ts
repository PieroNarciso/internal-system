import { Response, Request } from 'express';
import { getRepository } from 'typeorm';

import { Item } from '@/models/Item';

export const createItem = async (req: Request, res: Response) => {
  const { nombre, ordenId, totalDespachar } = req.body;
  try {
    const item = getRepository(Item).create({
      nombre,
      totalDespachar,
      orden: { id: ordenId }
    });
    await item.save();
  } catch (err) {
    return res.status(500).send(err);
  }
};


export const getItemById = async (req: Request, res: Response) => {
  try {
    const item = await getRepository(Item).findOne(req.params.itemId);
    return res.status(200).send(item); 
  } catch (err) {
    return res.status(500).send(err);
  }
};
