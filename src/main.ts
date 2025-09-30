import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //roda o projeto

  process.env.TZ = '-03:00'; //definindo o fuso horório do banco de dados

  app.useGlobalPipes(new ValidationPipe()); //usado para validar alguns campos através do validation

  app.enableCors(); //atua no front-end, comunicação do front com o back

  await app.listen(process.env.PORT ?? 4000); //roda o projeto
}
bootstrap();
