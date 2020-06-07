import AsyncStorage from '@react-native-community/async-storage'
import { setHighScoreError, getHighScoreError } from '../../data/dictionary.json'

const key = 'highScore'

const setHighScoreAsync = async (highScore) => {
  try {
    await AsyncStorage.setItem(key, highScore)
  } catch {
    alert(setHighScoreError)
  }
}

const getHighScoreAsync = async () => {
  try {
    const highScore = await AsyncStorage.getItem(key)
    return highScore ? highScore : 0
  } catch {
    alert(getHighScoreError)
  }
}

export { setHighScoreAsync, getHighScoreAsync }
