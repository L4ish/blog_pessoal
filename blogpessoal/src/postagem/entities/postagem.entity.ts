import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tb_postagens' }) //nome da tabela no banco de dados
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty() //valor do atributo não pode ser vazio.
  @Column({ length: 100, nullable: false })
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;
}
