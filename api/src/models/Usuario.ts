import {IsEmail, IsNotEmpty} from 'class-validator';
import { Column, PrimaryGeneratedColumn, Entity, BaseEntity, Generated } from 'typeorm';
import { Role } from '@/types';


@Entity('usuarios')
export class Usuario extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  uuid: string;

  @Column({ nullable: false, unique: true })
  @IsNotEmpty()
  username: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USUARIO,
  })
  role: string;

}
