import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../global/colors';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { StackAppParams } from '../../routes/app.routes';
import { songs } from '../../utils/playlist';
import MusicCard from '../../components/MusicCard';

const Jukebox = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackAppParams>>()

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity
        activeOpacity={.6}
        onPress={() => navigation.navigate('Home', {})}
      >
        <AntDesign name='left' size={35} color={colors.aliceBlue} />
      </TouchableOpacity>
      <Text style={styles.title}>Jukebox</Text>
      <TouchableOpacity
      >
        <AntDesign name='left' size={35} color={colors.prussianBlue} />
      </TouchableOpacity>
    </View>
    <View style={styles.content}>
      {
        songs.map((song) => <MusicCard key={song.name} name={song.name} author={song.author} length={song.length} />)
      }
    </View>
  </View>
  )
}

export default Jukebox;