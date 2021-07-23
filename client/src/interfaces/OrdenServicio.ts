import { Estado } from '@/types';
import { Empresa } from '@/interfaces/Empresa';
import { Historia } from '@/interfaces/Historia';

export interface OrdenServicio {
  id: number;
  numOrden: string;
  estado: Estado;
  empresa?: Empresa['id'] | Empresa;
  historias?: Historia[];
}
