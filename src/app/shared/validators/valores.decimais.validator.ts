import { AbstractControl, ValidationErrors } from "@angular/forms";

// Shared

import { LIMITE, REGEX } from "../contants";
import { formatarMoeda } from "../formatters";

export function validarNumeroDecimal(
  controle: string
) {
  return (group: AbstractControl): ValidationErrors | null => {
    let controleValor: any = group.get(controle)?.value;

    if (controleValor != null && controleValor != "") {
      if (REGEX.VALOR_DECIMAL_BR.test(controleValor)) {
        controleValor = formatarMoeda(controleValor, "", "");

        if (controleValor > LIMITE.VALOR_DECIMAL_BR) {
          return { invalid: true };
        }
      } else {
        return { invalid: true };
      }
    }

    return null;
  }
}