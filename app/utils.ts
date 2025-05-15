type CurrencyData = {
  code: string;
  decimalDigits: number;
};

type ConvertOptions = {
  amount: number;
  fromCode: string;
  toCode: string;
  baseCurrency: string;
  currencyRates: Record<string, number>;
  currenciesData: CurrencyData[];
};

export const convertCurrency = ({
  amount,
  fromCode,
  toCode,
  baseCurrency,
  currencyRates,
  currenciesData,
}: ConvertOptions): number => {
  if (!currencyRates[fromCode]) {
    throw new Error(`Exchange rate for currency ${fromCode} not found`);
  }
  if (!currencyRates[toCode]) {
    throw new Error(`Exchange rate for currency ${toCode} not found`);
  }
  const toCurrencyData = currenciesData.find((c) => c.code === toCode);
  const toDecimalDigits = toCurrencyData?.decimalDigits ?? 2;

  let result: number;

  if (fromCode === baseCurrency) {
    result = amount * currencyRates[toCode];
  } else if (toCode === baseCurrency) {
    result = amount / currencyRates[fromCode];
  } else {
    const amountInBase = amount / currencyRates[fromCode];
    result = amountInBase * currencyRates[toCode];
  }

  const factor = Math.pow(10, toDecimalDigits);
  result = Math.trunc(result * factor) / factor;

  return result;
};
