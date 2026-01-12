// Models

import { Endereco } from "../../enderecos/services/endereco";

export interface PedidoSintetico {
  id: number | null;
  nroPedido: number;
  dataCadastro: Date;
  dataEntrega: Date | null;
  descricao: string;
  valor: number;
  enderecoEntrega: Endereco | null;
}
