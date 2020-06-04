import { StyleSheet, Platform } from 'react-native'
import { colors } from '../../styles/variables.json'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {},
  textConteiner: {
    display: 'flex',
    flexDirection: 'row'
  },
  text: {
    marginTop: Platform.select({
      android: hp('1%'),
      ios: hp('1%'),
      default: hp('4%')
    }),
    marginRight: wp('1.2%'),
    color: colors.mainText,
    fontSize: Platform.select({ ios: wp('4%'), android: wp('4%'), default: wp('2%') })
  },
  boldText: {
    color: colors.mainText,
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginTop: Platform.select({ android: hp('1%'), ios: hp('1%') })
  },
  buttonContainer: {
    alignSelf: 'center',
    width: wp('25%'),
    marginTop: wp('1%')
  },
  buttonStyle: {
    color: colors.buttonContainer
  }
})
