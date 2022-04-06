import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useMqtt } from './hooks/mqtt';

const App = (): JSX.Element => {
  const { subscribe, payload } = useMqtt()

  useEffect(() => {
    subscribe('ola', { qos: 0 }, )
  }, [])

  useEffect(() => {
    console.log('PAYLOAD', payload)
  }, [payload])

  return (
    <View>
      <Text>Olá</Text>
    </View>
  );
};

export default App;
