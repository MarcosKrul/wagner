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
  slider: {
    width: Dimensions.get('window').width - 80,
    height: 50,
    flex: 0.3
  }
})