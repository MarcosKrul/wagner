import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export const styles = StyleSheet.create({
  topButtons: {
    width: Dimensions.get('window').width,
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  middleButtons: {
    width: Dimensions.get('window').width,
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomButtons: {
    width: Dimensions.get('window').width - 60,
    flex: 0.4,
    flexDirection: 'row',
    justifyContent: 'center',
  },
})