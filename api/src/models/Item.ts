import {
  Column,
  PrimaryGeneratedColumn,
  Generated,
  Entity,
  ManyToOne,
  BaseEntity,
} from 'typeorm';
import { OrdenServicio } from '@/models/OrdenServicio';
import { IsNotEmpty } from 'class-validator';

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

  @ManyToOne(() => OrdenServicio, (orden) => orden.items)
  orden: OrdenServicio;
}
