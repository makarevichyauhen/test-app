import { observer } from 'mobx-react-lite';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { currenciesExchangeService } from '../services/CurrenciesExchangeService';

export const AmountInput = observer(function AmountInput() {
  const { store } = currenciesExchangeService;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Amount:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(val) => store.setCurrencyFromAmount(val)}
        value={(store.currencyFromAmount ?? '').toString()}
        keyboardType="numeric"
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 8,
  },
});
