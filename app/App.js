import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TutorialsScreen from './src/screens/TutorialsScreen';
import TutorialDetailScreen from './src/screens/TutorialDetailScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import MaterialsScreen from './src/screens/MaterialsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const linking = {
  prefixes: ['kaki666://', 'https://koala04.ifn666.com', 'https://koala04.ifn666.com/assignment2'],
  config: {
    screens: {
      MainTabs: {
        screens: {
          Home: 'home',
          Tutorials: 'tutorials',
          Categories: 'categories',
          Materials: 'materials',
        },
      },
      TutorialDetail: 'tutorials/:id',
      Login: 'login',
      Register: 'register',
    },
  },
};

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tutorials" component={TutorialsScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Materials" component={MaterialsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="TutorialDetail" component={TutorialDetailScreen} options={{ title: 'Tutorial Detail' }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
