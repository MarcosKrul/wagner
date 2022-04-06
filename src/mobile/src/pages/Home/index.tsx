import { NavigationProp, useNavigation } from '@react-navigation/core';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { StackAppParams } from '../../routes/app.routes';
import { styles } from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../global/colors';
import { useMqtt } from '../../hooks/mqtt';

const Home = (): JSX.Element => {
  const { status } = useMqtt()
  const navigation = useNavigation<NavigationProp<StackAppParams>>()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={.6}
          onPress={() => navigation.navigate('Jukebox', {})}
        >
          <MaterialIcons name='music-note' size={35} color={colors.aliceBlue} />
        </TouchableOpacity>
        {
          status 
            ? <Ionicons name='cloud-done' size={35} color={colors.green} />
            : <Ionicons name='cloud-offline' size={35} color={colors.red} />
        }
        <TouchableOpacity
          activeOpacity={.6}
          onPress={() => navigation.navigate('Config', {})}
        >
          <MaterialIcons name='settings' size={35} color={colors.aliceBlue} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.topButtons}>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-up' style={{ transform: [{ rotateZ: '-45deg' }] }} size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-up' size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-up' style={{ transform: [{ rotateZ: '45deg' }] }} size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.middleButtons}>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-left' size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='crop-square' size={110} style={{ paddingTop: 20 }} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-right' size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-left' style={{ transform: [{ rotateZ: '-45deg' }] }} size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-down' size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={.6}
            onPress={() => {}}
          >
            <MaterialIcons name='keyboard-arrow-right' style={{ transform: [{ rotateZ: '45deg' }] }} size={150} color={colors.aliceBlue} />
          </TouchableOpacity>
        </View>

        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={360}
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