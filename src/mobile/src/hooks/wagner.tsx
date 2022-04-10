import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useState, useContext, useEffect } from 'react'

interface WagnerConfigs {
  buttonsOption: boolean;
}

interface WagnerContextData {
  configs: WagnerConfigs;
  switchButtonsOption: (option: boolean) => void;
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
        setConfigs(JSON.parse(storedConfigs))
      } else {
        const initialConfigs: WagnerConfigs = {
          buttonsOption: false
        }
        setConfigs(initialConfigs)
      }
    })()
  }, [])

  const switchButtonsOption = async (option: boolean): Promise<void> => {
    const newOptions: WagnerConfigs = { ...configs, buttonsOption: option }
    setConfigs(newOptions)
    await AsyncStorage.setItem('@Wagner:configs', JSON.stringify(newOptions))
    console.log('NEW', newOptions)
  }

  return (
    <WagnerContext.Provider
      value={{
        configs,
        switchButtonsOption
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