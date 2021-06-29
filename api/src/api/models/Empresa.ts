import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Empresa extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string;

  @Column()
  ruc: string;

}
