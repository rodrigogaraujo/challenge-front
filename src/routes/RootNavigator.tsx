import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigators'
import { DriverStack } from './DriverStack'
import { VehicleStack } from './VehicleStack'

const Stack = createNativeStackNavigator()

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Main' component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name='DriverStack' component={DriverStack} options={{ headerShown: false }} />
      <Stack.Screen name='VehicleStack' component={VehicleStack} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}
