import { Column, PrimaryGeneratedColumn, Entity, Generated, BaseEntity } from 'typeorm';

import { TipoNombre } from '@/types';


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
}
