import AntDesign from '@expo/vector-icons/AntDesign';
import { navigate } from 'expo-router/build/global-state/routing';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { currenciesExchangeService } from '../services/CurrenciesExchangeService';
import { ExchangeCurrencyType } from '../types';

type Props = {
  type: ExchangeCurrencyType;
};

export const SelectedCurrency = observer(function SelectedCurrencyTo({
  type,
}: Props) {
  const { store } = currenciesExchangeService;
  const selectedCurrencyData = computed(() =>
    type === 'from' ? store.selectedCurrencyFrom : store.selectedCurrencyTo
  ).get();

  return (
    <View>
      <Text style={styles.title}>{type === 'from' ? 'From' : 'To'}</Text>
      <TouchableOpacity
        style={styles.container}
        hitSlop={10}
        onPress={() => {
          store.setCurrencyFromAmount('');
          navigate({
            pathname: '/CurrenciesList',
            params: { type },
          });
        }}
      >
        <Image
          source={{ uri: selectedCurrencyData.flagSrc }}
          style={styles.image}
        />
        <Text style={styles.code}>{selectedCurrencyData.code}</Text>
        <AntDesign name="down" size={12} color="black" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    lineHeight: 20,
    paddingBottom: 8,
  },
  code: {
    fontSize: 16,
    lineHeight: 20,
    width: 40,
    paddingLeft: 5,
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#DEDEDE',
    borderRadius: 8,
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 20,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 1,
  },
});
