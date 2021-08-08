import { Column, OneToMany, PrimaryGeneratedColumn, Entity, Generated, BaseEntity } from 'typeorm';

import { TipoNombre } from '@/types';
import { Historia } from './Historia';


@Entity('tipos')
export class Tipo extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: TipoNombre,
    default: TipoNombre.PRODUCCION,
    unique: true,
  })
  nombre: string;

  @OneToMany(() => Historia, historia => historia.tipo)
  historias: Historia[];
}
