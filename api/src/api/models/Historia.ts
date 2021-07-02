import { Column, PrimaryGeneratedColumn, Entity, Generated, CreateDateColumn, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

import { Tipo } from '@/api/models/Tipo';
import { OrdenServicio } from '@/api/models/OrdenServicio';


@Entity('historias')
export class Historia {

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

  @OneToOne(() => Tipo)
  @JoinColumn()
  tipo: Tipo;

}
