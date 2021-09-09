import { getRepository } from 'typeorm';

import { Tipo } from '@/models/Tipo';
import { Estado } from '@/types';


class TipoService {

  public async create(payload: { tipoName: Estado }): Promise<Tipo> {
    try {
      if (!payload.tipoName) throw new Error('Missing tipo name');
      const tipo = getRepository(Tipo).create({
        nombre: payload.tipoName,
      });
      await tipo.save();
      return tipo;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async findAll(): Promise<Tipo[]> {
    try {
      const tipos = await getRepository(Tipo).find();
      return tipos;
    } catch (err) {
      throw new Error(err);
    }
  }
};


export default new TipoService();
