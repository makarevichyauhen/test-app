import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import ErrorBoundary from './ErrorBoundary';

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
        <Stack.Screen name="main" options={{ headerShown: false }} />
        <Stack.Screen
          name="currenciesList"
          options={{ title: 'Currency Select' }}
        />
      </Stack>
    </ErrorBoundary>
  );
}
