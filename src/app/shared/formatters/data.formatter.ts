import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

  export function formatarData(data: NgbDateStruct | string | null, fim?: boolean): Date {
    if (data != null) {
			switch (typeof data) {
				case "string":
          let partes: string[] = data.replaceAll("-", "/").split("/");

          let dia: number = parseInt(partes[0]);
          let mes: number = parseInt(partes[1]);
          let ano: number = parseInt(partes[2]);

          if (fim) {
            return new Date(ano, mes - 1, dia, 23, 59, 59);
          } else {
            return new Date(ano, mes - 1, dia, 0, 0, 0);
          }
        default:
          if (fim) {
            return new Date(data.year, data.month - 1, data.day, 23, 59, 59);
          } else {
            return new Date(data.year, data.month - 1, data.day, 0, 0, 0);
          }
      }
    } else {
      let dataHoje: Date = new Date();

      if (fim) {
        return new Date(dataHoje.getFullYear(), dataHoje.getMonth(), dataHoje.getDate(), 23, 59, 59);
      } else {
        return new Date(dataHoje.getFullYear(), dataHoje.getMonth(), dataHoje.getDate(), 0, 0, 0);
      }
    }
  }