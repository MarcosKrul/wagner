import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../global/colors';


export const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
    margin: 20,
    padding: 20,
    borderColor: colors.cgBlue,
    borderWidth: 0.5,
    backgroundColor: colors.sapphireBlue
  },
  propsText: {
    fontSize: 18,
    color: colors.aliceBlue
  }
})