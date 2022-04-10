import { StyleSheet } from 'react-native';
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
  title: {
    fontSize: 24,
    color: colors.aliceBlue
  },
  content: {
    flex: 18,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  switchContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15
  },
  switchText: {
    fontSize: 18,
    color: colors.aliceBlue,
    paddingLeft: 10
  }
})