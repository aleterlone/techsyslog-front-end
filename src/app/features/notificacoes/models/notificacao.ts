// Models

import { PedidoSintetico } from "../../pedidos/models/pedido-sintetico";

export interface Notificacao {
  lida: boolean;
  pedidoSintetico: PedidoSintetico;
}
