import { Column, PrimaryGeneratedColumn, Entity, BaseEntity } from 'typeorm';


@Entity()
export class OrdenServicio extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  empresaId: number;

  @Column()
  numOrden: string;

  @Column()
  estado: string;

}
