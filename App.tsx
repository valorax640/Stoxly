import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EntryScreen from './src/screens/EntryScreen';
import LoginScreen from './src/screens/LoginScreen';
// import BottomTabs from './src/navigation/BottomTabs';
import { ActivityIndicator, View } from 'react-native';
import { BottomTabs } from 'react-native-screens';
// import { LocationProvider } from './src/context/LocationContext';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(''); // null = loading

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          setInitialRoute("Dashboard");
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        setInitialRoute('Entry');
      }
    };
    checkToken();
  }, []);

  if (initialRoute === '') {
    // Loading screen
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    // <LocationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Entry" component={EntryScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Dashboard" component={BottomTabs} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    // </LocationProvider>
  );
}
