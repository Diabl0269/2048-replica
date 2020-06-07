import AsyncStorage from '@react-native-community/async-storage'
import { setHighScoreError, getHighScoreError } from '../../data/dictionary.json'
import { Alert } from 'react-native'

const key = 'highScore'

const setHighScoreAsync = async (highScore) => {
  try {
    await AsyncStorage.setItem(key, highScore.toString())
  } catch {
    Alert.alert(setHighScoreError)
  }
}

const getHighScoreAsync = async () => {
  try {
    const highScore = await AsyncStorage.getItem(key)
    return highScore ? highScore : 0
  } catch {
    Alert.alert(getHighScoreError)
  }
}

export { setHighScoreAsync, getHighScoreAsync }
