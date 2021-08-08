import { Column, PrimaryGeneratedColumn, Entity, Generated, CreateDateColumn, ManyToOne, BaseEntity } from 'typeorm';

import { Tipo } from '@/models/Tipo';
import { OrdenServicio } from '@/models/OrdenServicio';
import { Item } from '@/models/Item';


@Entity('historias')
export class Historia extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'float' })
  peso: number;

  @ManyToOne(() => OrdenServicio, orden => orden.historias)
  orden: OrdenServicio;

  @ManyToOne(() => Item, item => item.historias)
  item: Item;

  @ManyToOne(() => Tipo, tipo => tipo.historias)
  tipo: Tipo;

}
