import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import ErrorBoundary from './ErrorBoundary';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: '', headerShown: false }}
        />
        <Stack.Screen
          name="CurrenciesList"
          options={{ title: 'Currency Select' }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
