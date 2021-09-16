import { Estado } from '@/types';
import { Business } from '@/interfaces/business.interface';
import { Item, ItemCreate } from '@/interfaces/item.interface';
import { History } from '@/interfaces/history.interface';

export interface OrdenBase {
  id: number;
  empresa: Business;
  numOrden: string;
  estado: Estado;
}

export interface OrdenCreate
  extends Omit<OrdenBase, 'id' | 'empresa' | 'estado'> {
  empresaId: number;
  items?: ItemCreate[];
}

export interface Orden extends OrdenBase {
  items: Item[];
}

export interface OrdenDetail extends OrdenBase {
  items: Item[];
  historias: History[];
}

export interface OrdenUpdate extends Partial<OrdenCreate> {
  estado?: Estado;
}
