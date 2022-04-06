import React from 'react';
import { Text, View } from 'react-native';
import { useMqtt } from '../../hooks/mqtt';
import { styles } from './styles';

const ConfigCard = (): JSX.Element => {
  const { clientMqtt } = useMqtt();

  return (
    <View style={styles.container}>
      <Text style={styles.propsText}>Broker: {clientMqtt?.options?.host || 'Broker indisponível'}</Text>
      <Text style={styles.propsText}>Porta: {clientMqtt?.options?.port || 'Porta indisponível'}</Text>
      <Text style={styles.propsText}>Protocolo: {clientMqtt?.options?.protocol || 'Protocolo indisponível'}</Text>
      <Text style={styles.propsText}>Cliente: {clientMqtt?.options?.clientId || 'Cliente indisponível'}</Text>
    </View>
  )
}

export default ConfigCard