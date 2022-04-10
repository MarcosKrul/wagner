import React, { useEffect } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { StackAppParams } from '../../routes/app.routes';
import { styles } from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../global/colors';
import MqttStatus from '../../components/MqttStatus';
import Joypad from '../../components/Joypad';
import { useMqtt } from '../../hooks/mqtt';

const Home = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackAppParams>>()
  const { publish } = useMqtt()

  const executeAction = (action: string): void => {
    publish('embarcados.controle.wagner.controle', action, { qos: 1 }, () => console.log('PUBLISHED: ', action))
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={.6}
          onPress={() => navigation.navigate('Jukebox', {})}
        >
          <MaterialIcons name='music-note' size={35} color={colors.aliceBlue} />
        </TouchableOpacity>
        <MqttStatus />
        <TouchableOpacity
          activeOpacity={.6}
          onPress={() => navigation.navigate('Config', {})}
        >
          <MaterialIcons name='settings' size={35} color={colors.aliceBlue} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Joypad executeAction={executeAction} />
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={colors.cgBlue}
            maximumTrackTintColor="#000000"
            thumbTintColor={colors.carolinaBlue}
          />
        </View>
      </View>
    </View>
  )
}

export default Home;