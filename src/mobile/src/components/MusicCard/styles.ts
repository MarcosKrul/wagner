import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  content: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 40,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.aliceBlue
  },
  author: {
    fontSize: 14,
    color: colors.aliceBlue
  },
  progressBar: {
    width: Dimensions.get('window').width - 40,
    height: 3,
    backgroundColor: colors.carolinaBlue,
    alignSelf: 'flex-start'
  }
})