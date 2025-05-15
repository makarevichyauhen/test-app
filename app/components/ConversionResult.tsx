import { observer } from 'mobx-react-lite';
import { StyleSheet, Text } from 'react-native';
import { currenciesExchangeService } from '../services/CurrenciesExchangeService';

export const ConversionResult = observer(function ConversionResult() {
  const { store } = currenciesExchangeService;
  if (!store.currencyFromAmount) {
    return null;
  }

  return (
    <>
      <Text style={styles.from}>
        {store.currencyFromAmount} {store.selectedCurrencyFrom.symbol} =
      </Text>
      <Text style={styles.to}>
        {store.exchangeResult} {store.selectedCurrencyTo.symbol}
      </Text>
    </>
  );
});

const styles = StyleSheet.create({
  from: {
    fontSize: 16,
    lineHeight: 20,
  },
  to: {
    fontSize: 42,
    lineHeight: 50,
  },
});
