import { getRepository } from 'typeorm';

import { Item } from '@/models/Item';

class ItemService {
  public async create(payload: {
    ordenId: number;
    name: string;
    totalDespachar: number;
  }): Promise<Item> {
    try {
      const item = getRepository(Item).create({
        orden: { id: payload.ordenId },
        nombre: payload.name,
        totalDespachar: payload.totalDespachar,
      });
      await item.save();
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async bulkCreate(
    payload: {
      ordenId: number;
      name: string;
      totalDespachar: number;
    }[]
  ): Promise<Item[]> {
    const result: Item[] = [];
    for (const item of payload) {
      try {
        const itemCreated = await this.create(item);
        result.push(itemCreated);
      } catch (err) {
        continue;
      }
    }
    return result;
  }

  public async findById(id: number) {
    try {
      if (!id) throw new Error('Missing Id');
      const item = await getRepository(Item).findOne(id);
      if (!item) throw new Error('Not Found');
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async update(
    id: number,
    payload: { name?: string; totalDespachar?: number }
  ): Promise<Item> {
    try {
      if (!id) throw new Error('Missing Id');
      const item = await getRepository(Item).findOne(id);
      if (!item) throw new Error('Not Found');
      item.nombre = payload.name ? payload.name : item.nombre;
      item.totalDespachar = payload.totalDespachar
        ? payload.totalDespachar
        : item.totalDespachar;
      await item.save();
      return item;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new ItemService();
