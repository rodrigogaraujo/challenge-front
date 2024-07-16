import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RegisterScreen from '../screens/Register'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { DriverStackNavigationProp, DriverStackParamList } from '../models/routes'

const { Navigator, Screen } = createNativeStackNavigator<DriverStackParamList>()

export function DriverStack() {
  const navigation = useNavigation<DriverStackNavigationProp>()
  return (
    <Navigator screenOptions={{ animation: 'ios' }}>
      <Screen
        name='RegisterScreen'
        component={RegisterScreen}
        options={{
          title: 'Cadastrar motorista',
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons
                name='arrow-back-ios-new'
                size={24}
                color='#000'
                style={{ marginRight: 16 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Navigator>
  )
}
