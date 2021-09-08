import { getRepository } from 'typeorm';

import { Historia } from '@/models/Historia';

class HistoryService {
  public async create(payload: {
    tipoId: number;
    peso: number;
  }): Promise<Historia> {
    try {
      const history = getRepository(Historia).create({
        tipo: { id: payload.tipoId },
        peso: payload.peso,
      });
      await history.save();
      return history;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default new HistoryService();
