import { OrdenServicio } from '@/interfaces/OrdenServicio';

export interface Empresa {
  id: number;
  razonSocial: string;
  ruc: string;
  ordenes?: OrdenServicio[];
}
