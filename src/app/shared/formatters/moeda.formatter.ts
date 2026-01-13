// Shared

import { REGEX } from "../constants";

export function formatarMoeda(valor: number | null | undefined, locale: string | undefined, currency: string | undefined): string {
  if (locale == null) {
    locale = "pt-BR";
  }

  if (currency == null) {
    currency = "BRL";
  }

  let valorRetorno: number = 0;

  if (valor != null) {
    const numero = Number(valor);

    if (!isNaN(numero)) {
      valorRetorno = numero;
    }
  }

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency
  }).format(valorRetorno);
}

export function formatarNumeroDecimal(valor: string | number | null): number {
  if (valor != null) {
    let valorAlterado: number = Number(valor.toString().replaceAll(REGEX.PONTO, "").replaceAll(REGEX.VIRGULA, "."));

    if (isNaN(valorAlterado)) {
      return 0;
    }

    return Number(valorAlterado.toFixed(2));
  }

  return 0;
}