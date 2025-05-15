import { useLocalSearchParams } from 'expo-router';
import { observer } from 'mobx-react-lite';
import { FlatList, StyleSheet, View } from 'react-native';
import { CurrenciesListItem } from './components/CurrenciesListItem';
import { SearchInput } from './components/SearchInput';
import { currenciesExchangeService } from './services/CurrenciesExchangeService';
import { CurrencyData, ExchangeCurrencyType } from './types';

const CurrenciesList = observer(function CurrenciesList() {
  const { type } = useLocalSearchParams<{ type: ExchangeCurrencyType }>();
  const { store } = currenciesExchangeService;

  const renderItem = ({ item }: { item: CurrencyData }) => {
    return <CurrenciesListItem type={type} data={item} />;
  };

  return (
    <View style={styles.container}>
      <SearchInput />
      <FlatList
        style={styles.flatlistStyle}
        contentContainerStyle={styles.flatlistContentContainerStyle}
        data={store.currenciesBySearchAndRates}
        renderItem={renderItem}
        keyExtractor={(item) => item.code}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  flatlistStyle: {
    paddingHorizontal: 20,
  },
  flatlistContentContainerStyle: {
    borderRadius: 8,
    overflow: 'hidden',
  },
});

export default CurrenciesList;
