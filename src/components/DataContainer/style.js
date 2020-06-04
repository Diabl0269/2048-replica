import { StyleSheet, Platform } from 'react-native'
import { colors, borderRadiusSize } from '../../styles/variables.json'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.dataContainer,
    borderRadius: wp(borderRadiusSize),
    padding: wp('1%'),
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Platform.select({
      android: wp('3%'),
      ios: wp('3%'),
      default: wp('1.5%')
    }),
    color: colors.dataContainerTitle
  },
  data: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Platform.select({
      android: wp('4%'),
      ios: wp('4%'),
      default: wp('2%')
    }),
    color: colors.dataContainerText
  }
})
