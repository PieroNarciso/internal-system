import { TipoName } from '@/types';

export interface TipoBase {
  id: number;
  nombre: TipoName;
}

export interface TipoCreate {
  tipoName: TipoName;
}

export interface Tipo extends Omit<TipoBase, 'id'> {
  nombre: TipoName;
}
