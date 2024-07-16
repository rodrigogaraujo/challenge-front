import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface RegisterVehicleScreenParams {
  id: string
}

export type VehicleStackParamList = {
  RegisterVehicleScreen: RegisterVehicleScreenParams
}

export type VehicleStackNavigationProp = NativeStackNavigationProp<
  VehicleStackParamList,
  'RegisterVehicleScreen'
>

interface RegisterScreenParams {
  id: string
}

export type DriverStackParamList = {
  RegisterScreen: RegisterScreenParams
}

export type DriverStackNavigationProp = NativeStackNavigationProp<
  DriverStackParamList,
  'RegisterScreen'
>

export type RootStackParamList = {
  DriverStack: undefined
  VehicleStack: undefined
}

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>
