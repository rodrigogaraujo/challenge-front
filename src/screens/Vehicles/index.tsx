import React, { useCallback, useEffect, useState } from 'react'
import { View, FlatList, Alert } from 'react-native'
import { MMKVService, MMKVServiceVehicles } from '../../config/mmkvStorage'
import * as S from './styles'
import ItemListCar from '../../components/ItemListCar'
import ModalConfirm from '../../components/ModalConfirm'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RootStackNavigationProp } from '../../models/routes'
import { Vehicle } from '~/models/Vehicle'

const VehiclesScreen = () => {
  const [data, setData] = useState(MMKVServiceVehicles.list())
  const [selected, setSelected] = useState<Vehicle | { id: string }>({ id: '' })
  const [modalVisible, setModalVisible] = useState(false)

  const getData = useCallback(() => {
    setData(MMKVServiceVehicles.list())
  }, [])

  useEffect(() => {
    getData()
  }, [MMKVServiceVehicles])

  useFocusEffect(
    useCallback(() => {
      getData()
      setSelected({ id: '' })
    }, [])
  )
  const navigation = useNavigation<RootStackNavigationProp>()
  const [attached, setAttached] = useState(false)
  const drivers = MMKVService.list()

  useEffect(() => {
    if (drivers?.length) {
      const Attached = drivers.map((it) => it?.vehicle?.key)
      setAttached(Attached.includes(selected?.id))
    }
  }, [drivers])

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemListCar
            selected={selected === item}
            data={item}
            setSelected={() => {
              if (item === selected) {
                setSelected({ id: '' })
              } else {
                if (item.id) setSelected(item)
              }
            }}
          />
        )}
        ListHeaderComponent={() => {
          return (
            <>
              {data.length > 0 ? (
                <S.Header>
                  <S.HeaderItem width={5}></S.HeaderItem>
                  <S.HeaderItem width={65}>
                    <S.Text>Descrição</S.Text>
                  </S.HeaderItem>
                  <S.HeaderItem width={30}>
                    <S.Text>Vínculo</S.Text>
                  </S.HeaderItem>
                </S.Header>
              ) : null}
            </>
          )
        }}
        ListEmptyComponent={() => (
          <S.Content
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 60,
            }}
          >
            <S.Text>Não há dados disponíveis</S.Text>
          </S.Content>
        )}
      />
      {selected ? (
        <S.ButtonView>
          <S.Button
            onPress={() => {
              navigation.navigate('VehicleStack', {
                screen: 'RegisterVehicleScreen',
                params: { id: selected.id },
              } as never)
            }}
          >
            <S.Text>Editar</S.Text>
          </S.Button>
          <S.Button onPress={() => setModalVisible(true)}>
            <S.Text>Deletar</S.Text>
          </S.Button>
        </S.ButtonView>
      ) : null}
      <ModalConfirm
        modalIsVisible={modalVisible}
        onChangeVisible={() => setModalVisible(false)}
        setDelete={() => {
          if (attached) {
            Alert.alert(
              'Não foi possivel deletar!',
              'Esse veículo já está vinculado a algum motorista, não pode ser deletado!'
            )
          } else {
            if (selected?.id) {
              MMKVServiceVehicles.remove(selected?.id)
              setSelected({ id: '' })
              getData()
            }
          }
        }}
      />
    </View>
  )
}

export default VehiclesScreen
