import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../global/colors';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { StackAppParams } from '../../routes/app.routes';
import ConfigCard from '../../components/ConfigCard';
import { useWagner } from '../../hooks/wagner';

const Config = (): JSX.Element => {
  const navigation = useNavigation<NavigationProp<StackAppParams>>()
  const { configs: { buttonsOption }, switchButtonsOption } = useWagner();

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
      <View style={styles.content}>
        <ConfigCard />
        <TouchableOpacity
          activeOpacity={.6}
          style={styles.switchContainer}
          onPress={() => switchButtonsOption(!buttonsOption)}
        >
          <Text style={styles.switchText}>{!buttonsOption ? 'Pressionar botões' : 'Segurar botões'}</Text>
          <Switch 
            onChange={() => switchButtonsOption(!buttonsOption)}
            value={buttonsOption}
            thumbColor={colors.carolinaBlue}
            trackColor={{
              false: '#141414',
              true: colors.sapphireBlue
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Config;