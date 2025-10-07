import { TemaService } from './../../tema/services/tema.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Postagem } from '../entities/postagem.entity';
import { Repository, ILike } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';

@Injectable() //service sempre começa com injectable. Injectablo sigifica que o nest administra essa classe.
export class PostagemService {
  constructor(
    @InjectRepository(Postagem) //Injectrepository é da ORM e serve para fazer interações com o banco de dados.Postagem é minha entity.
    private postagemRepository: Repository<Postagem>, //variável do tipo repository que recebe minha entidade Postagem.
    private temaService: TemaService, //injeção de dependências para ter acesso aos métodos da class tema service
  ) {}

  //Método findAll = listar todas as postagens persistidas no banco de dados.
  //meu pedido async é uma promise(promessa) de que vai chegar as prostagens, caso não chegue é emitido erro 404.
  async findAll(): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      //await aguardar a resposta.
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  //Método findById = listar postagem por ID.
  async findById(id: number): Promise<Postagem> {
    const postagem = await this.postagemRepository.findOne({
      where: {
        id,
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });

    if (!postagem)
      throw new HttpException('Postagem não encontrada!', HttpStatus.NOT_FOUND);

    return postagem;
  }

  //Listar postagem por título
  async findAllByTitulo(titulo: string): Promise<Postagem[]> {
    return await this.postagemRepository.find({
      // TYPEORM vai no banco de dados e pesquisa para mim através da cláusula WHERE.
      where: {
        titulo: ILike(`%${titulo}%`),
      },
      relations: {
        tema: true,
        usuario: true,
      },
    });
  }

  //Método criar - cadastrar
  async create(postagem: Postagem): Promise<Postagem> {
    await this.temaService.findById(postagem.tema.id);
    // o create recebe a postagem e salva ela no banco. Não precisa do ID.
    return await this.postagemRepository.save(postagem);
  }

  //Método atualizar
  async update(postagem: Postagem): Promise<Postagem> {
    await this.findById(postagem.id); //pesquisa a postagem por ID. O findById faz a verificação de se a postagem existe ou não. Caso não exista apresneta o erro 404.
    await this.temaService.findById(postagem.tema.id);
    return await this.postagemRepository.save(postagem); //recebe a postagem já com o ID e salva por cima de um que já existia.
  }

  //Método deletar
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); //verifica se a postagem exite através do id. Caso existe, ele vai no banco de dados e apaga a postagem através do id.
    return await this.postagemRepository.delete(id);
  }
}
