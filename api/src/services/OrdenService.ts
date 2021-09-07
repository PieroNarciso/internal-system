import { getRepository } from 'typeorm';
import { OrdenServicio } from '@/models/OrdenServicio';
import { Item } from '@/models/Item';

class OrdenService {
  public async create(payload: {
    empresaId: number;
    numOrden: string;
    items?: { name: string; totalDespachar: number }[];
  }) {
    try {
      if (!payload.empresaId || !payload.numOrden)
        throw new Error('Missing Attributes');
      const orden = getRepository(OrdenServicio).create({
        numOrden: payload.numOrden,
        empresa: { id: payload.empresaId },
      });
      await orden.save();
      if (payload.items) {
        for (const itemAttrs of payload.items) {
          try {
            const item = getRepository(Item).create({
              nombre: itemAttrs.name,
              totalDespachar: itemAttrs.totalDespachar,
            });
            await item.save();
          } catch (err) {
            console.log(err);
            continue;
          }
        }
      }
      await orden.empresa.reload();
      return orden;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new OrdenService();
