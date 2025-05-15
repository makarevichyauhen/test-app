import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { currenciesExchangeService } from '../services/CurrenciesExchangeService';
import { CurrencyData, ExchangeCurrencyType } from '../types';

type Props = {
  data: CurrencyData;
  type: ExchangeCurrencyType;
};

export const CurrenciesListItem = observer(function CurrenciesListItem({
  data,
  type,
}: Props) {
  const { store } = currenciesExchangeService;
  const isSelected = computed(() => {
    const currentSelectedCode =
      type === 'from'
        ? store.selectedCurrencyFrom.code
        : store.selectedCurrencyTo.code;
    return data.code === currentSelectedCode;
  }).get();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: isSelected ? '#DEDEDE' : '#E7E7E7' },
      ]}
      onPress={() =>
        type === 'from'
          ? store.setSelectedCurrencyFrom(data)
          : store.setSelectedCurrencyTo(data)
      }
    >
      <View style={styles.imageAnCaptionContainer}>
        <Image source={{ uri: data.flagSrc }} style={styles.image} />
        <Text>
          {data.code} - {data.name}
        </Text>
      </View>

      <View style={styles.radioButtonContainer}>
        <View
          style={[
            styles.radioButton,
            { backgroundColor: isSelected ? '#000000' : '#ffffff' },
          ]}
        ></View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  imageAnCaptionContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 52,
    gap: 5,
    justifyContent: 'space-between',
  },
  image: {
    width: 30,
    height: 20,
    borderRadius: 4,
    borderColor: '#000000',
    borderWidth: 1,
  },
  radioButtonContainer: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    borderRadius: 27,
    width: 16,
    height: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButton: {
    borderRadius: 20,
    width: 8,
    height: 8,
  },
});
