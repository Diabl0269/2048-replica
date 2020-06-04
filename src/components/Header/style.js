import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../styles/variables.json'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: hp('3%')
  },
  titleContainer: {
    color: colors.mainText,
    fontSize: Platform.select({
      android: wp('9%'),
      ios: wp('9%'),
      default: wp('6%')
    }),
    fontWeight: 'bold',
    marginRight: Platform.select({
      android: wp('30%'),
      ios: wp('30%'),
      default: wp('10%')
    })
  },
  dataContainersContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  emptySpace: {
    width: wp('1%')
  }
})
