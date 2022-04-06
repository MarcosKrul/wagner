import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { IClientOptions } from '@taoqf/react-native-mqtt';
import { MqttProvider } from '../hooks/mqtt';
import { colors } from '../global/colors';
import AppRoutes from './app.routes';

const mqttProps: { brokerUrl: string, options: IClientOptions } = {
  brokerUrl: 'ws://broker.hivemq.com:8000/mqtt',
  options: {
    port: 8000,
    protocol: 'ws' as 'ws',
    host: 'broker.hivemq.com',
    clientId: `Wagner${Math.random() * 100}`,
    keepalive: 60,
    protocolId: 'MQTT',
    protocolVersion: 4,
    clean: true,
    reconnectPeriod: 1000,
    connectTimeout: 30 * 1000,
    will: {
      topic: 'WillMsg',
      payload: 'Connection Closed abnormally..!',
      qos: 0,
      retain: false
    },
  },
};

const Routes = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  })

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Wagner</Text>
        <Text style={styles.subtitle}>O próprio original</Text>
        <ActivityIndicator style={styles.loading} size='large' color={colors.carolinaBlue} />
      </View>
    )
  }

  return (
    <MqttProvider mqttProps={mqttProps}>
      <AppRoutes />
    </MqttProvider>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.prussianBlue
  },
  title: {
    fontSize: 64,
    color: colors.cgBlue
  },
  subtitle: {
    fontSize: 22,
    color: colors.sapphireBlue,
  },
  loading: {
    paddingTop: 20
  } 
})

export default Routes;