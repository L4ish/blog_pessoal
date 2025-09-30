import { Module } from '@nestjs/common';
import { Bcrypt } from './bcrypt/bcrypt';

@Module({
  imports: [],
  providers: [Bcrypt], //a classe bcrypt foi registada na AuthModule, pois ela é resposável pela lógica de criptografia de senhas.
  controllers: [],
  exports: [Bcrypt],
})
export class AuthModule {}
