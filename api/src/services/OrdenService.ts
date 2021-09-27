import { getRepository } from 'typeorm';
import { OrdenServicio } from '@/models/OrdenServicio';
import { Item } from '@/models/Item';
import { Estado } from '@/types';
import { Empresa } from '@/models/Empresa';
import ItemService from './ItemService';

class OrdenService {
  public async create(payload: {
    empresaId: number;
    numOrden: string;
    items?: { name: string; totalDespachar: number }[];
  }): Promise<OrdenServicio> {
    try {
      if (!payload.empresaId || !payload.numOrden)
        throw new Error('Missing Attributes');
      const orden = getRepository(OrdenServicio).create({
        numOrden: payload.numOrden,
        empresa: { id: payload.empresaId },
      });
      await orden.save();
      if (payload.items) {
        orden.items = await ItemService.bulkCreate(
          payload.items.map((item) => {
            return { ...item, ordenId: orden.id };
          })
        );
      }
      await orden.empresa.reload();
      return orden;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAll(): Promise<OrdenServicio[]> {
    try {
      const ordenes = await getRepository(OrdenServicio).find({
        relations: ['items', 'empresa'],
      });
      return ordenes;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findById(id: number): Promise<OrdenServicio> {
    try {
      if (!id) throw new Error('Missing Id');
      const orden = await getRepository(OrdenServicio).findOne(
        { id },
        { relations: ['historias', 'items', 'empresa'] }
      );
      if (!orden) throw new Error('Not Found');
      return orden;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAndUpdateById(
    id: number,
    payload: {
      empresaId?: number;
      estado?: Estado;
      numOrden?: string;
      items?: { id: number; name: string; totalDespachar: number }[];
    }
  ): Promise<boolean> {
    try {
      if (!id) throw new Error('Missing id');
      const orden = await getRepository(OrdenServicio).findOne(id, {
        relations: ['items'],
      });
      if (!orden) return false;
      if (payload.empresaId) orden.empresa = <Empresa>{ id: payload.empresaId };
      if (payload.estado) orden.estado = payload.estado;
      if (payload.numOrden) orden.numOrden = payload.numOrden;
      if (payload.items) {
        for (const item of payload.items) {
          try {
            if (!item.id) throw new Error('Missing item id');
            await getRepository(Item).update(item.id, {
              nombre: item.name,
              totalDespachar: item.totalDespachar,
            });
          } catch (err) {
            console.log(err);
            continue;
          }
        }
      }
      await orden.save();
      return true;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new OrdenService();
