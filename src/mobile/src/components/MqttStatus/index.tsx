import React, { useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMqtt } from '../../hooks/mqtt';
import { colors } from '../../global/colors';

const MqttStatus = (): JSX.Element => {
  const { status, clientMqtt } = useMqtt()
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const Content = (): JSX.Element => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-evenly' }}>
      <Text style={{ color: colors.aliceBlue }}>A conexão MQTT está {status ? 'ativa' : 'inativa'}</Text>
      <Text style={{ color: colors.aliceBlue }}>Broker: {`${clientMqtt?.options?.host}:${clientMqtt?.options?.port}` || 'Indisponível'}</Text>
    </View>
  )

  return (
    <Tooltip
      isVisible={tooltipVisible}
      contentStyle={{ backgroundColor: colors.prussianBlue, height: 70, width: 240 }}
      content={<Content />}
      placement='bottom'
      onClose={() => setTooltipVisible(false)}
    >
      <TouchableOpacity 
        activeOpacity={.6}
        onPress={() => setTooltipVisible(true)}
        >
        {
          status 
            ? <Ionicons name='cloud-done' size={35} color={colors.green} />
            : <Ionicons name='cloud-offline' size={35} color={colors.red} />
        }
      </TouchableOpacity>
    </Tooltip>
  )
}

export default MqttStatus;