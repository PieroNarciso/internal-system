export interface ItemBase {
  nombre: string;
  totalDespachar: number;
}

export interface ItemLocalId {
  id: string;
}

export interface ItemCreate extends Omit<ItemBase, 'nombre'> {
  name: string;
}

export interface ItemCreateWithLocalId extends ItemCreate, ItemLocalId {}

export interface ItemUpdate extends Partial<ItemCreate> {
  id: Item['id'];
}

export interface Item extends ItemBase {
  id: number;
  uuid: string;
  nombre: string;
  totalDespachado: number;
}
