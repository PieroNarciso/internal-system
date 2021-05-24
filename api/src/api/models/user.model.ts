import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Min } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  firstName: string;

  @Column({
    type: 'varchar'
  })
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    select: false,
  })
  @Min(8)
  password: string;
}
