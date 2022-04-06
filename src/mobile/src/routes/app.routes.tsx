import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Jukebox from '../pages/Jukebox';

const Stack = createNativeStackNavigator();

const AppRoutes = (): JSX.Element => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Jukebox" component={Jukebox} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppRoutes;