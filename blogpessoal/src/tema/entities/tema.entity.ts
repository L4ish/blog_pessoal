import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity';

@Entity({ name: 'tb_temas' })
export class Tema {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 22, nullable: false })
  descricao: string;

  //criando relacionamento com a entidade postagem
  @OneToMany(() => Postagem, (postagem) => postagem.tema)
  postagem: Postagem[];
}
