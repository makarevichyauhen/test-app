import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AmountInput } from './components/AmountInput';
import { ConversionResult } from './components/ConversionResult';
import { SelectedCurrency } from './components/SelectedCurrency';
import { currenciesExchangeService } from './services/CurrenciesExchangeService';

const Main = observer(function Main() {
  const { store } = currenciesExchangeService;
  useEffect(() => {
    currenciesExchangeService.getExchangeRates();
  }, []);

  if (store.ratesIsNotLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.currenciesContainer}>
        <SelectedCurrency type="from" />
        <TouchableOpacity
          onPress={() => store.swapCurrencies()}
          style={styles.swapButton}
        >
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <SelectedCurrency type="to" />
      </View>
      <AmountInput />
      <ConversionResult />
    </SafeAreaView>
  );
});

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: windowHeight / 4,
  },
  currenciesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  swapButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 19,
  },
  icon: {
    width: 18,
    height: 18,
  },
});

export default Main;
