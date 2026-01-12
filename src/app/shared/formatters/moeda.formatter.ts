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