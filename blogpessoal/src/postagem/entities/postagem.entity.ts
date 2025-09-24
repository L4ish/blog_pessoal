import { IsNotEmpty } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity';

@Entity({ name: 'tb_postagens' }) //nome da tabela no banco de dados
export class Postagem {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty() //valor do atributo não pode ser vazio.
  @Column({ length: 100, nullable: false }) //valor do atributo não pode ser nulo.
  titulo: string;

  @IsNotEmpty()
  @Column({ length: 1000, nullable: false })
  texto: string;

  @UpdateDateColumn()
  data: Date;

  //criando relacionamento com a entidade tema
  @ManyToOne(() => Tema, (tema) => tema.postagem, {
    onDelete: 'CASCADE',
  })
  tema: Tema;
}
