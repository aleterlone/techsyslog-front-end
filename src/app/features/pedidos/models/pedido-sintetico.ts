// Models

import { Endereco } from "../../enderecos/models/endereco";
import { PedidoStatus } from "../../pedidos-status/models/pedido-status";

export interface PedidoSintetico {
  id: string | null;
  nroPedido: number | null;
  dataCadastro: Date;
  dataEntrega: Date | null;
  nome: string;
  descricao: string;
  valorTotal: number;
  enderecoEntrega: Endereco | null;
  status: PedidoStatus | null;
}
