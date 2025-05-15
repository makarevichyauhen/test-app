import AntDesign from '@expo/vector-icons/AntDesign';
import { observer } from 'mobx-react-lite';
import { StyleSheet, TextInput, View } from 'react-native';
import { currenciesExchangeService } from '../services/CurrenciesExchangeService';

export const SearchInput = observer(function AmountInput() {
  const { store } = currenciesExchangeService;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(val) => store.setCurrencySearch(val)}
        value={store.currencySearch}
        keyboardType="numeric"
      />
      <AntDesign name="search1" size={24} color="black" style={styles.icon} />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  icon: {
    position: 'absolute',
    top: 30,
    left: 30,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    paddingVertical: 20,
    paddingRight: 16,
    paddingLeft: 45,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
});
