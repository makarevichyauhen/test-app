import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { currencies } from '../currencies';
import { CurrencyData, Rates } from '../types';
import { convertCurrency } from '../utils';

export const defaulCurrencyFrom: CurrencyData = {
  name: 'US Dollar',
  symbol: '$',
  decimalDigits: 2,
  code: 'USD',
  flagSrc: 'https://flagcdn.com/h40/us.png',
};

export const defaulCurrencyTo: CurrencyData = {
  name: 'Euro',
  symbol: '€',
  decimalDigits: 2,
  code: 'EUR',
  flagSrc: 'https://flagcdn.com/h40/ie.png',
};

export class CurrenciesExchangeStore {
  selectedCurrencyFrom = defaulCurrencyFrom;
  selectedCurrencyTo = defaulCurrencyTo;
  currencyFromAmount: string = '1';
  currencySearch = '';
  rates: Rates = { base: 'USD', rates: {} };
  currencies: CurrencyData[] = currencies.map(
    ({ name, flagSrc, code, decimalDigits, symbol }) => ({
      name,
      flagSrc,
      code,
      decimalDigits,
      symbol,
    })
  );
  constructor() {
    makeObservable(this, {
      selectedCurrencyFrom: true,
      selectedCurrencyTo: true,
      currencyFromAmount: true,
      currencySearch: true,
      rates: true,
      ratesIsNotLoaded: true,
    });
    makePersistable(
      this,
      {
        name: 'CurrenciesExchangeStore',
        properties: ['rates'],
        storage: AsyncStorage,
        expireIn: 86400000,
        removeOnExpiration: true,
        stringify: true,
        debugMode: true,
      },
      { fireImmediately: false }
    );
  }

  get currenciesBySearchAndRates() {
    return this.currencies.filter(
      (currency) =>
        Object.keys(this.rates.rates).includes(currency.code) &&
        (currency.code
          .toLowerCase()
          .includes(this.currencySearch?.toLocaleLowerCase()) ||
          currency.name
            .toLocaleLowerCase()
            .startsWith(this.currencySearch?.toLocaleLowerCase()))
    );
  }

  get ratesIsNotLoaded() {
    return Object.keys(this.rates.rates).length === 0;
  }

  get exchangeResult() {
    const amount = Number(this.currencyFromAmount);
    if (!amount || isNaN(amount)) {
      return null;
    }
    return convertCurrency({
      amount: Number(this.currencyFromAmount),
      fromCode: this.selectedCurrencyFrom.code,
      toCode: this.selectedCurrencyTo.code,
      baseCurrency: this.rates.base,
      currencyRates: this.rates.rates,
      currenciesData: this.currencies,
    });
  }

  setSelectedCurrencyFrom(selectedCurrencyFrom: CurrencyData) {
    this.selectedCurrencyFrom = selectedCurrencyFrom;
  }

  setSelectedCurrencyTo(selectedCurrencyTo: CurrencyData) {
    this.selectedCurrencyTo = selectedCurrencyTo;
  }

  setCurrencyFromAmount(amount: string) {
    amount = amount.replace(/[^0-9.,]/g, '');
    if (amount.includes('.')) {
      const [base, decimal] = amount.split('.');
      if (this.selectedCurrencyFrom.decimalDigits === 0) {
        this.currencyFromAmount = base;
        return;
      }
      this.currencyFromAmount = `${base}.${decimal.slice(0, this.selectedCurrencyFrom.decimalDigits)}`;
      return;
    }
    this.currencyFromAmount = amount;
  }

  setCurrencySearch(search: string) {
    this.currencySearch = search;
  }

  setRates(rates: Rates) {
    this.rates = rates;
  }

  swapCurrencies() {
    [
      this.selectedCurrencyFrom,
      this.selectedCurrencyTo,
      this.currencyFromAmount,
    ] = [
      this.selectedCurrencyTo,
      this.selectedCurrencyFrom,
      (this.exchangeResult || '').toString(),
    ];
  }
}
