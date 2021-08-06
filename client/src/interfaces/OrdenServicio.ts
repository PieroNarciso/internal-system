import { Estado } from '@/types';
import { Empresa } from '@/interfaces/Empresa';
import { Historia } from '@/interfaces/Historia';
import { Item } from '@/interfaces/Item';

export interface OrdenServicio {
  id: number;
  numOrden: string;
  estado: Estado;
  items?: Item[];
  empresa?: Empresa | Empresa['id'];
  historias?: Historia[];
}
