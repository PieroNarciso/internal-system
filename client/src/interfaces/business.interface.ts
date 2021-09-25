export interface BusinessBase {
  razonSocial: string;
  ruc: string;
}

export interface BusinessCreate extends BusinessBase {}

export interface Business extends BusinessBase {
  id: number;
}
