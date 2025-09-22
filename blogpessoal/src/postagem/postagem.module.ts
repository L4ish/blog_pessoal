import { Module } from '@nestjs/common';
import { Postagem } from './entities/postagem.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemService } from './services/postagem.service';
import { PostagemController } from './controllers/postagem.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Postagem])], //registando a class Postagem, no módulo postagem.
  providers: [PostagemService],
  controllers: [PostagemController],
  exports: [],
})
export class PostagemModule {}
