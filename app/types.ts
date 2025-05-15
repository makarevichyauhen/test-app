export type ExchangeCurrencyType = 'from' | 'to';
export type Rates = { base: string; rates: Record<string, number> | {} };
export type CurrencyData = {
  name: string;
  symbol: string;
  flagSrc: string;
  code: string;
  decimalDigits: number;
};
