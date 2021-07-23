import { OrdenServicio } from '@/interfaces/OrdenServicio';
import { Item } from '@/interfaces/Item';
import { Tipo } from '@/interfaces/Tipo';

export interface Historia {
  id: number;
  uuid: string;
  createdAt: Date;
  peso: number;
  orden?: OrdenServicio['id'] | OrdenServicio;
  item?: Item;
  tipo?: |Tipo;
}
