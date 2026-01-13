// Models

import { Endereco } from "../../enderecos/models/endereco";

export interface PedidoSintetico {
  id: number | null;
  nroPedido: number | null;
  dataCadastro: Date;
  dataEntrega: Date | null;
  descricao: string;
  valorTotal: number;
  enderecoEntrega: Endereco | null;
}
