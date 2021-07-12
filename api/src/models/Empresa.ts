import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrdenServicio } from '@/api/models/OrdenServicio';


@Entity()
export class Empresa extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  razonSocial: string;

  @Column()
  ruc: string;

  @OneToMany(() => OrdenServicio, orden => orden.empresa)
  ordenes: OrdenServicio[];

}
