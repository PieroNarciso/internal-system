import { ManyToOne, Column, PrimaryGeneratedColumn, Entity, BaseEntity, OneToMany } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

import { Empresa } from '@/api/models/Empresa';
import { Historia } from '@/api/models/Historia';
import { Item } from '@/api/models/Item';
import { Estado } from '@/api/types';


@Entity()
export class OrdenServicio extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  numOrden: string;

  @Column({
    type: 'enum',
    enum: Estado,
    default: Estado.ACTIVO,
  })
  estado: string;

  @ManyToOne(() =>  Empresa, empresa => empresa.ordenes)
  empresa: Empresa;

  @OneToMany(() => Historia, historia => historia.orden)
  historias: Historia[];

  @OneToMany(() => Item, item => item.orden)
  items: Item[];

}
