import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemModule } from './postagem/postagem.module';
import { Postagem } from './postagem/entities/postagem.entity';
import { Tema } from './tema/entities/tema.entity';
import { TemaModule } from './tema/tema.module';

// APP module, inicia a aplicação por inteiro. A função desse arquivo é saber de onde vem cada componente, para meu projeto rodar.
@Module({
  //aqui fica a conexão com o banco de dados
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_blogpessoal',
      entities: [Postagem, Tema],
      synchronize: true,
    }),
    PostagemModule,
    TemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
