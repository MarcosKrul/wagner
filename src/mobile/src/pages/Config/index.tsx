import React from 'react';
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
  const { configs: { buttonsOption, controlTopic, speedTopic }, switchButtonsOption } = useWagner();

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
          <View style={{ flex: 1 }}>
            <Text style={styles.switchText}>{!buttonsOption ? 'Pressionar botões' : 'Segurar botões'}</Text>
            <Text style={styles.switchSubText}>{
              !buttonsOption
                ? 'A ação cessará imediatamente após o toque'
                : 'A ação cessará ao parar de pressionar o botão'
            
            }</Text>
          </View>
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
        <TouchableOpacity
          activeOpacity={.6}
          style={{ ...styles.switchContainer, alignItems: 'center' }}
          onPress={() => switchButtonsOption(!buttonsOption)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.switchText}>Tópico de controles</Text>
            <Text numberOfLines={1} style={styles.switchSubText}>{controlTopic}</Text>
          </View>
          <AntDesign name='right' color={colors.aliceBlue} size={30} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.6}
          style={{ ...styles.switchContainer, alignItems: 'center' }}
          onPress={() => switchButtonsOption(!buttonsOption)}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.switchText}>Tópico de velocidade</Text>
            <Text numberOfLines={1} style={styles.switchSubText}>{speedTopic}</Text>
          </View>
          <AntDesign name='right' color={colors.aliceBlue} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Config;