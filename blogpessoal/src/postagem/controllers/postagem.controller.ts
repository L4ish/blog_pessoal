import { PostagemService } from './../services/postagem.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { Postagem } from '../entities/postagem.entity';

@Controller('/postagens') //sempre terá o @controller e o seu caminho que nesse caso é /postagens/.
export class PostagemController {
  constructor(private readonly postagemService: PostagemService) {} //a controller precisa da minha postagem service. Readonly, apenas de leitua. Usa as coisas da service.

  //normalmente o get() e get('/:id') vem antes dos gests com os outros filtros, isso é apenas por questão de organização do código.
  @Get()
  @HttpCode(HttpStatus.OK)
  //utiliza promise porque depende da promessa da postagem.
  findAll(): Promise<Postagem[]> {
    return this.postagemService.findAll(); //não é async porque executa em tempo real, ele apenas chama a service, ela que executa o async no banco de dados.
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Postagem> {
    return this.postagemService.findById(id);
  }
  //os gets precisam ser diferentes um do outro.
  @Get('/titulo/:titulo')
  @HttpCode(HttpStatus.OK)
  findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
    //o q importa, é na hora do this.postagemService na controller, estar escrito igual ao da service mesmo.
    return this.postagemService.findAllByTitulo(titulo);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.create(postagem);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() postagem: Postagem): Promise<Postagem> {
    return this.postagemService.update(postagem);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.postagemService.delete(id);
  }
}
