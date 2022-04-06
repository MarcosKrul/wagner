import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../global/colors';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { StackAppParams } from '../../routes/app.routes';

const Config = (): JSX.Element => {
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
        <Text style={styles.title}>Configurações</Text>
        <TouchableOpacity
        >
          <AntDesign name='left' size={35} color={colors.prussianBlue} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}></View>
      <Text>Config</Text>
    </View>
  )
}

export default Config;