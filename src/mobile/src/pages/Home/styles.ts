import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.prussianBlue
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: '#000'
  },
  content: {
    flex: 18,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
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
  slider: {
    width: Dimensions.get('window').width - 80,
    height: 50,
    flex: 0.3
  }
})