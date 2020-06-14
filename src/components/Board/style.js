import { StyleSheet, Platform } from 'react-native'
import { colors, borderRadiusSize } from '../../styles/variables.json'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const mobileTileSize = '10%'
const mobileBoardSize = '50%'
const webTileSize = '17%'
const webBoardSize = '80%'

const tile = {
  // '@keyframes appear': {
  //   from: { opacity: 0 },
  //   to: { opacity: 1 }
  // },
  // animationKeyframes: '$appear',
  // animationDuration: '5s',
  height: Platform.select({
    ios: hp(mobileTileSize),
    android: hp(mobileTileSize),
    default: hp(webTileSize)
  }),
  width: Platform.select({
    ios: hp(mobileTileSize),
    android: hp(mobileTileSize),
    default: hp(webTileSize)
  }),
  margin: hp('1%'),
  borderRadius: wp(borderRadiusSize),
  justifyContent: 'center',
  alignItems: 'center',
  ...Platform.select({
    android: {},
    ios: {},
    default: { userSelect: 'none' }
  }),
  zIndex: 1000
}

export default StyleSheet.create({
  board: {
    marginTop: hp('3%'),
    marginBottom: hp('3%'),
    padding: hp('1%'),
    backgroundColor: colors.dataContainer,
    display: 'flex',
    height: Platform.select({
      ios: hp(mobileBoardSize),
      android: hp(mobileBoardSize),
      default: hp(webBoardSize)
    }),
    width: Platform.select({
      ios: hp(mobileBoardSize),
      android: hp(mobileBoardSize),
      default: hp(webBoardSize)
    }),

    borderRadius: wp(borderRadiusSize)
  },
  tileText: {
    fontSize: Platform.select({
      ios: wp('6%'),
      android: wp('6%'),
      default: wp('4%')
    }),
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.mainText
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  emptyTile: {
    ...tile,
    backgroundColor: colors.emptyTile
  },
  tile2: {
    ...tile,
    backgroundColor: colors.tile2
  },
  tile4: {
    ...tile,
    backgroundColor: colors.tile4
    // color: colors.mainText
  },
  tile8: {
    ...tile,
    backgroundColor: colors.tile8
    // color: colors['off-white']
  },
  tile16: {
    ...tile,
    backgroundColor: colors.tile16
    // color: colors['off-white']
  },
  tile32: {
    ...tile,
    backgroundColor: colors.tile32
    // color: colors['off-white']
  },
  tile64: {
    ...tile,
    backgroundColor: colors.tile64
    // color: colors['off-white']
  },
  tile128: {
    ...tile,
    backgroundColor: colors.tile128
    // color: colors['off-white']
  },
  tile256: {
    ...tile,
    backgroundColor: colors.tile256
    // color: colors['off-white']
  },
  tile512: {
    ...tile,
    backgroundColor: colors.tile512
    // color: colors['off-white']
  },
  tile1024: {
    ...tile,
    backgroundColor: colors.tile1024
    // color: colors['off-white']
  },
  tile2048: {
    ...tile,
    backgroundColor: colors.tile2048
    // color: colors['off-white']
  }
})
