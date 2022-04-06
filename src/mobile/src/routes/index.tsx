import React, { useEffect, useState } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { IClientOptions } from '@taoqf/react-native-mqtt';
import { MqttProvider } from '../hooks/mqtt';
import App from '../App';

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color='#000' />
      </View>
    )
  }

  return (
    <MqttProvider mqttProps={mqttProps}>
      <App />
    </MqttProvider>
  )
};


export default Routes;