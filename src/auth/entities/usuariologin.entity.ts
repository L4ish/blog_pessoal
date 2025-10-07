import { ApiProperty } from '@nestjs/swagger';

export class UsuarioLogin {
  @ApiProperty()
  public usuario: string;

  @ApiProperty()
  public senha: string;
}

//DTO (Data Transfer Object) qum padrão de software que cria objetos simples para transportar dados entre diferentes camadas ou subsistemas de uma aplicação. O principal objetivo é agrupar e transferir apenas os dados necessários, otimizando a comunicação, reduzindo o tráfego de dados desnecessários e isolando a lógica de negócio da camada de apresentação.
