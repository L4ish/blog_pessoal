import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //roda o projeto

  const config = new DocumentBuilder()
    .setTitle('Blog Pessoal da Laish')
    .setDescription(
      'Projeto guia desenvolvido em nest, abordando conhecimentos de relacionamento entre entidades, auth com bcrypt e jwt, testes com jest e documentação com swagger.',
    )
    .setContact(
      'Laish',
      'https://www.linkedin.com/in/laish-rodrigues/',
      'laish_rodrigues@hotmail.com',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00'; //definindo o fuso horório do banco de dados

  app.useGlobalPipes(new ValidationPipe()); //usado para validar alguns campos através do validation

  app.enableCors(); //atua no front-end, comunicação do front com o back

  await app.listen(process.env.PORT ?? 4000); //roda o projeto
}
bootstrap();
