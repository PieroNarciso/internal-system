import { Historia } from '@/interfaces/Historia';
import { OrdenServicio } from '@/interfaces/OrdenServicio';

export interface Item {
  id: number;
  uuid: string;
  nombre: string;
  totalDespachar: number;
  totalDespachado: number;
  historias?: Historia[];
  orden?: OrdenServicio['id'] | OrdenServicio;
}
