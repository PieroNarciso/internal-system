export interface ItemBase {
  nombre: string;
  totalDespachar: number;
}

export interface ItemCreate extends Omit<ItemBase, 'nombre'> {
  name: string;
}

export interface ItemUpdate extends Partial<ItemCreate> {}

export interface Item extends ItemBase {
  id: number;
  uuid: string;
  nombre: string;
  totalDespachado: number;
}
