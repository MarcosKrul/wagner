import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { MqttProps } from './mqtt'

export interface WagnerConfigs {
  buttonsOption: boolean;
  controlTopic: string;
  speedTopic: string;
  mqttProps: MqttProps;
}

interface WagnerContextData {
  configs: WagnerConfigs;
  switchButtonsOption: (option: boolean) => Promise<void>;
  changeTopics: (newTopic: string, which: 0 | 1, callback: () => void) => Promise<void>;
}

const WagnerContext = createContext<WagnerContextData>({} as WagnerContextData)

export const WagnerProvider: React.FC = ({ children }) => {
  const [configs, setConfigs] = useState<WagnerConfigs>({} as WagnerConfigs)
  
  useEffect(() => {
    (async() => {
      const [storedConfigs] = await Promise.all([
        AsyncStorage.getItem('@Wagner:configs')
      ])

      if (storedConfigs) {
        const parsedConfigs: WagnerConfigs = JSON.parse(storedConfigs)

        if (parsedConfigs.buttonsOption && parsedConfigs.controlTopic && parsedConfigs.speedTopic && parsedConfigs.mqttProps) {
          setConfigs(JSON.parse(storedConfigs))
        } else {
            const initialConfigs: WagnerConfigs = {
              buttonsOption: false,
              controlTopic: 'Sistemas.Embarcados.Wagner.Actions.Control',
              speedTopic: 'Sistemas.Embarcados.Wagner.Actions.Speed',
              mqttProps: {
                brokerUrl: 'ws://broker.hivemq.com:8000/mqtt',
                options: {
                  port: 8000,
                  protocol: 'ws' as 'ws',
                  host: 'broker.hivemq.com',
                  clientId: `Wagner-${Math.floor(Math.random() * 100)}`,
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
              }
            }
            setConfigs(initialConfigs)
        }
      } 
    })()
  }, [])

  const switchButtonsOption = async (option: boolean): Promise<void> => {
    const newOptions: WagnerConfigs = { ...configs, buttonsOption: option };
    setConfigs(newOptions);
    await AsyncStorage.setItem('@Wagner:configs', JSON.stringify(newOptions));
  }

  const changeTopics = async (newTopic: string, which: number, callback: () => void): Promise<void> => {
    const newOptions: WagnerConfigs = which === 0
      ? { ...configs, controlTopic: newTopic }
      : { ...configs, speedTopic: newTopic }

    setConfigs(newOptions);
    await AsyncStorage.setItem('@Wagner:configs', JSON.stringify(newOptions));
    callback();
  }

  return (
    <WagnerContext.Provider
      value={{
        configs,
        switchButtonsOption,
        changeTopics
      }}
    >
      {children}
    </WagnerContext.Provider>
  )
}

export const useWagner = () : WagnerContextData => {
  const context = useContext(WagnerContext)

  if (!context) {
    throw new Error('useWagner must be used within an WagnerProvider')
  }

  return context
}