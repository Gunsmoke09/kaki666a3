import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthScreen from '../screens/AuthScreen';
import DetailScreen from '../screens/DetailScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export const linking = {
  prefixes: ['https://ifn666.com', 'ifn666://'],
  config: {
    screens: {
      Home: '',
      Detail: 'tasks/:id',
      Auth: 'auth',
    },
  },
};

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
