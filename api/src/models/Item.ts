import {
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { OrdenServicio } from '@/models/OrdenServicio';
import { IsNotEmpty } from 'class-validator';
import { Historia } from '@/models/Historia';

@Entity('items')
export class Item  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  @IsNotEmpty()
  nombre: string;

  @Column({ type: 'float', nullable: false })
  @IsNotEmpty()
  totalDespachar: number;

  @Column({ type: 'float', default: 0.0 })
  totalDespachado: number;

  @OneToMany(() => Historia, historia => historia.item)
  historias: Historia[];

  @ManyToOne(() => OrdenServicio, orden => orden.items)
  orden: OrdenServicio;
}
