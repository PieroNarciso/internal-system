import {IsNotEmpty} from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, Generated } from 'typeorm';


@Entity('tipos')
export class Tipo {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column()
  @IsNotEmpty()
  nombre: string;

}
