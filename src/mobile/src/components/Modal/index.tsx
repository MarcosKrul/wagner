import React from 'react';
import { Modal, TouchableOpacity, View, Text } from 'react-native';
import { styles } from './styles';

interface CustomModal {
  visible: boolean;
  onClose: () => void;
}

const CustomModal: React.FC<CustomModal> = ({ children, onClose, visible }) => {

  return (
    <Modal
      animationType='slide'
      visible={visible}
      onRequestClose={onClose}
      transparent
    >
      <View style={styles.container}>
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

export default CustomModal;