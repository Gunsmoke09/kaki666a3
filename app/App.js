import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator, { linking } from './navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <StatusBar style="auto" />
      <AppNavigator />
    </NavigationContainer>
  );
}
