import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Jukebox from '../pages/Jukebox';
import Config from '../pages/Config';

export type StackAppParams = {
  Home: {
    id?: number
  },
  Jukebox: {
    id?: number
  },
  Config: {
    id?: number
  }
}

const Stack = createNativeStackNavigator<StackAppParams>();

const AppRoutes = (): JSX.Element => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        animation: 'fade'
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Jukebox" component={Jukebox} />
        <Stack.Screen name="Config" component={Config} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes;