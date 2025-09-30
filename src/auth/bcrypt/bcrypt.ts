import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable() //Utilizado para marcar a classe como um serviço, permitindo que ela seja injetada em outras classes através da injeção de dependências do NestJs.
export class Bcrypt {
  async criptografarSenha(senha: string): Promise<string> {
    const saltos = 10;
    return await bcrypt.hash(senha, saltos);
  }

  async compararSenhas(
    senhaDigitada: string,
    senhaBanco: string,
  ): Promise<boolean> {
    return await bcrypt.compare(senhaDigitada, senhaBanco);
  }
}
