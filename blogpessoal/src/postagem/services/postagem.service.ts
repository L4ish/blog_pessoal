import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostagemService {
  constructor(
    @InjectRepository(Postagem)
    private postagemRepository: Repository<Postagem>,
  ) {}

  //Método findAll = listar todas as postagens persistidas no banco de dados.
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find();
  }
}
