import axios from 'axios';
import { CurrenciesExchangeStore } from '../stores/CurrenciesExchangeStore';
import { Rates } from '../types';

export class CurrenciesExchangeService {
  store: CurrenciesExchangeStore;
  constructor() {
    this.store = new CurrenciesExchangeStore();
  }

  getExchangeRates() {
    axios
      .get<Rates>('https://api.vatcomply.com/rates')
      .then((response) => {
        this.store.setRates(response.data);
      })
      .catch(() => {
        throw new Error('Error fetching data');
      });
  }
}

export const currenciesExchangeService = new CurrenciesExchangeService();
