import { TipoBase } from '@/interfaces/tipe.interface';
import { TipoName } from '@/types';

export interface HistoryBase {
  tipoId: TipoBase['id'];
  peso: number;
}

export interface HistoryCreate extends HistoryBase {}

export interface History extends Omit<HistoryBase, 'tipoId'> {
  id: number;
  uuid: string;
  itemId: number;
  tipo: TipoName;
  createdAt: Date;
}
