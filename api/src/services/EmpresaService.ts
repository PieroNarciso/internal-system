import { getRepository } from 'typeorm';

import { Empresa } from '@/models/Empresa';

class EmpresaService {
  public async create(payload: {
    razonSocial: string;
    ruc: string;
  }): Promise<Empresa> {
    try {
      if (!payload.razonSocial || !payload.ruc)
        throw new Error('Missing attributes');
      const empresa = getRepository(Empresa).create({
        razonSocial: payload.razonSocial,
        ruc: payload.ruc,
      });
      await empresa.save();
      return empresa;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findById(id: number) {
    try {
      if (!id) throw new Error('Missing id');
      const empresa = await getRepository(Empresa).findOne({ id });
      if (empresa)
        return empresa;
      throw new Error('Not Found');
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new EmpresaService();
