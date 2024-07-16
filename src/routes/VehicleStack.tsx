import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { TouchableOpacity } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import RegisterVehicleScreen from '../screens/RegisterVehicle'
import { VehicleStackNavigationProp, VehicleStackParamList } from '../models/routes'

const { Navigator, Screen } = createNativeStackNavigator<VehicleStackParamList>()

export function VehicleStack() {
  const navigation = useNavigation<VehicleStackNavigationProp>()
  return (
    <Navigator screenOptions={{ animation: 'ios' }}>
      <Screen
        name='RegisterVehicleScreen'
        component={RegisterVehicleScreen}
        options={{
          title: 'Cadastrar veículos',
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
